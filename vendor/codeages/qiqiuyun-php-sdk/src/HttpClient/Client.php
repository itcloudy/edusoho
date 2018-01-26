<?php

namespace QiQiuYun\SDK\HttpClient;

use Psr\Log\LoggerInterface;


class Client
{
    /**
     * Default request options
     *
     * @var array
     */
    private $options;

    /**
     * @var LoggerInterface
     */
    private $logger;

    public function __construct($options = array(), LoggerInterface $logger = null)
    {
        $this->options = array_merge(array(
            'timeout' => 300,
        ), $options);

        $this->logger = $logger;
    }

    public function request($method, $uri = '', array $options = array())
    {
        $method = strtoupper($method);
        $options = $this->prepareDefaults($options);

        $headers = isset($options['headers']) ? $options['headers'] : array();
        $body = isset($options['body']) ? $options['body'] : null;
        if (isset($options['json'])) {
            $body = json_encode($options['json']);
            $headers['Content-Type'] = 'application/json';
        }

        $uri = $this->buildUri($uri, $options);

        $options = array(
            CURLOPT_CUSTOMREQUEST => $method,
            CURLOPT_HTTPHEADER => $this->compileRequestHeaders($headers),
            CURLOPT_URL => $uri,
            CURLOPT_CONNECTTIMEOUT => 10,
            CURLOPT_TIMEOUT => $options['timeout'],
            CURLOPT_RETURNTRANSFER => true, // Follow 301 redirects
            CURLOPT_HEADER => true, // Enable header processing
        );

        if ('GET' !== $method) {
            $options[CURLOPT_POSTFIELDS] = $body;
        }

        $this->logger && $this->logger->info("HTTP {$method} {$uri}", array(
            'headers' => $options[CURLOPT_HTTPHEADER],
            'body' => $body,
        ));

        $curl = curl_init();
        curl_setopt_array($curl, $options);

        $rawResponse = curl_exec($curl);

        $errorCode = curl_errno($curl);
        if ($errorCode) {
            throw new ClientException(\curl_error($curl), $errorCode);
        }

        curl_close($curl);

        list($rawHeaders, $rawBody) = $this->extractResponseHeadersAndBody($rawResponse);

        $this->logger && $this->logger->info("HTTP Response", array(
            'headers' => $rawHeaders,
            'body' => $rawBody,
        ));

        return new Response($rawHeaders, $rawBody);
    }

    /**
     * Merges default options into the array.
     *
     * @param array $options Options to modify by reference
     *
     * @return array
     */
    private function prepareDefaults($options)
    {
        $defaults = $this->options;

        if (array_key_exists('headers', $options)) {
            if (null === $options['headers']) {
                unset($options['headers']);
            } elseif (!is_array($options['headers'])) {
                throw new \InvalidArgumentException('headers must be an array');
            }
        }

        // Shallow merge defaults underneath options.
        $result = $options + $defaults;

        // Remove null values.
        foreach ($result as $k => $v) {
            if (null === $v) {
                unset($result[$k]);
            }
        }

        return $result;
    }

    private function buildUri($uri, array $options)
    {
        if (empty($options['base_uri'])) {
            return $uri;
        }

        return rtrim($options['base_uri'], "\/").$uri;
    }

    public function compileRequestHeaders(array $headers)
    {
        $return = array();

        foreach ($headers as $key => $value) {
            $return[] = $key.': '.$value;
        }

        return $return;
    }

    public function extractResponseHeadersAndBody($rawResponse)
    {
        $parts = explode("\r\n\r\n", $rawResponse);
        $rawBody = array_pop($parts);
        $rawHeaders = implode("\r\n\r\n", $parts);

        return array(trim($rawHeaders), trim($rawBody));
    }
}
