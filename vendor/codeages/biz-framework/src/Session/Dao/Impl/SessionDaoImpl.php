<?php

namespace Codeages\Biz\Framework\Session\Dao\Impl;

use Codeages\Biz\Framework\Dao\GeneralDaoImpl;
use Codeages\Biz\Framework\Session\Dao\SessionDao;

class SessionDaoImpl extends GeneralDaoImpl implements SessionDao
{
    protected $table = 'sessions';

    protected $table2 = 'biz_session';

    public function declares()
    {
        return array(
            'timestamps' => array('created_time', 'sess_time'),
            'orderbys' => array(),
            'serializes' => array(),
            'conditions' => array(),
        );
    }


    public function getBySessId($sessId)
    {
        $sql = "SELECT * FROM {$this->table} WHERE sess_id = ?  LIMIT 1";
        $session = $this->db()->fetchAssoc($sql, array($sessId));
        if (empty($session)) {
            $sql = "SELECT * FROM {$this->table2} WHERE sess_id = ?  LIMIT 1";
            $session = $this->db()->fetchAssoc($sql, array($sessId));
        }
        return $session;
    }

    public function deleteBySessId($sessId)
    {
        $sql = "DELETE FROM {$this->table} WHERE sess_id = ?";

        return $this->db()->executeUpdate($sql, array($sessId));
    }

    public function deleteBySessDeadlineLessThan($sessDeadline)
    {
        $sql = "DELETE FROM {$this->table} WHERE sess_deadline < ?";

        return $this->db()->executeUpdate($sql, array($sessDeadline));
    }
}
