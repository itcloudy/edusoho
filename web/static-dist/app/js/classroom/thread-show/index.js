webpackJsonp(["app/js/classroom/thread-show/index"],{0:function(t,e){t.exports=jQuery},"29cf60bbbbb4e174f0f6":function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var a=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),o=n("b334fd7e4c5a19234db2"),s=function(t){return t&&t.__esModule?t:{default:t}}(o),i=function(){function t(e){r(this,t),this.ele=$(e.element),this.init()}return a(t,[{key:"init",value:function(){this.initEvent(),$("[name=access-intercept-check]").length>0&&$.get($("[name=access-intercept-check]").val(),function(t){t||$(".access-intercept-modal").modal("show")},"json"),this.initPostForm()}},{key:"initEvent",value:function(){var t=this,e=this.ele;e.on("click",".js-post-more",function(e){return t.onClickPostMore(e)}),e.on("click",".js-reply",function(e){return t.onClickReply(e)}),e.on("click",".js-post-delete",function(e){return t.onPostDelete(e)}),e.on("click",".js-post-up",function(e){return t.onPostUp(e)}),e.on("click","[data-role=confirm-btn]",function(e){return t.onConfirmBtn(e)}),e.on("click",".js-toggle-subpost-form",function(e){return t.onClickToggleSubpostForm(e)}),e.on("click",".js-event-cancel",function(e){return t.onClickEventCancelBtn(e)}),e.on("click",".thread-subpost-container .pagination a",function(e){return t.onClickSubpost(e)})}},{key:"onClickPostMore",value:function(t){t.stopPropagation();var e=$(t.currentTarget);e.parents(".thread-subpost-moretext").addClass("hide"),e.parents(".thread-post").find(".thread-subpost").removeClass("hide"),e.parents(".thread-post").find(".pagination").removeClass("hide")}},{key:"onClickReply",value:function(t){t.stopPropagation();var e=$(t.currentTarget),n=e.parents(".thread-subpost-list").length>0,r=e.parents(".thread-post").find(".thread-subpost-container"),a=r.find(".thread-subpost-form");if(n){a.removeClass("hide");var o=Translator.trans("thread.post.reply")+" @ "+e.parents(".thread-post").data("authorName")+"： ";a.find("textarea").val(o).trigger("focus")}else r.toggleClass("hide");e.html()==Translator.trans("thread.post.reply")?e.html(Translator.trans("thread.post.put_away")):e.html(Translator.trans("thread.post.reply")),this.initSubpostForm(a)}},{key:"onPostDelete",value:function(t){t.stopPropagation();var e=this.ele,n=$(t.currentTarget);if(confirm(Translator.trans("thread.post.delete_hint"))){var r=n.parents(".thread-subpost-list").length>0;$.post(n.data("url"),function(){if(r){var t=n.parents(".thread-post").find(".subposts-num");t.text(parseInt(t.text())-1)}else e.find(".thread-post-num").text(parseInt(e.find(".thread-post-num").text())-1);$(n.data("for")).remove()})}}},{key:"onPostUp",value:function(t){t.stopPropagation();var e=$(t.currentTarget);$.post(e.data("url"),function(t){"ok"==t.status?e.find(".post-up-num").text(parseInt(e.find(".post-up-num").text())+1):"votedError"==t.status?(0,s.default)("danger",Translator.trans("thread.post.like_hint")):(0,s.default)("danger",Translator.trans("thread.post.like_error_hint"))},"json")}},{key:"onConfirmBtn",value:function(t){t.stopPropagation();var e=$(t.currentTarget);confirm(e.data("confirmMessage"))&&$.post(e.data("url"),function(){if(e.data("afterUrl"))return void(window.location.href=e.data("afterUrl"));window.location.reload()})}},{key:"onClickToggleSubpostForm",value:function(t){t.stopPropagation();var e=$(t.currentTarget),n=e.parents(".thread-subpost-container").find(".thread-subpost-form");n.toggleClass("hide"),this.initSubpostForm(n)}},{key:"onClickEventCancelBtn",value:function(t){$.post($(t.currentTarget).data("url"),function(t){window.location.reload()})}},{key:"onClickSubpost",value:function(t){t.preventDefault();var e=$(t.currentTarget);$.post(e.attr("href"),function(t){var n=e.parents(".thread-post").attr("id");$("body,html").animate({scrollTop:$("#"+n).offset().top},300),e.closest(".thread-subpost-container .thread-subpost-content").html(t)})}},{key:"initPostForm",value:function(){var t=$(".thread-pripost-list"),e=$("#thread-post-form");if(0!=e.length){var n=null,r=e.find("textarea[name=content]");r.data("imageUploadUrl")&&(n=CKEDITOR.replace(r.attr("id"),{toolbar:"Thread",fileSingleSizeLimit:app.fileSingleSizeLimit,filebrowserImageUploadUrl:r.data("imageUploadUrl")}),n.on("change",function(){r.val(n.getData())}));var a=e.find("[type=submit]");e.validate({ajax:!0,currentDom:a,rules:{content:"required"},submitSuccess:function(o){a.button("reset"),r.data("imageUploadUrl")?(t.append(o),n.setData("")):(t.prepend(o),r.val(""));var s=t.find("li:last-child").offset();$("body").scrollTop(s.top),e.find(".thread-post-num").text(parseInt(e.find(".thread-post-num").text())+1),t.find("li.empty").remove(),t.closest(".top-reply").removeClass("hidden"),$(".js-attachment-list").empty(),$(".js-attachment-ids").val(""),$(".js-upload-file").show()},submitError:function(t){a.button("reset"),t=$.parseJSON(t.responseText),t.error?(0,s.default)("danger",t.error.message):(0,s.default)("danger",Translator.trans("thread.post.reply_error_hint"))}})}}},{key:"initSubpostForm",value:function(t){var e=t.find("[type=submit]");t.validate({ajax:!0,currentDom:e,rules:{content:"required"},submitSuccess:function(n){if(n.error)return void(0,s.default)("danger",n.error);e.button("reset"),t.parents(".thread-subpost-container").find(".thread-subpost-list").append(n),t.find("textarea").val("");var r=t.parents(".thread-post").find(".subposts-num");r.text(parseInt(r.text())+1),r.parent().removeClass("hide")},submitError:function(t){e.button("reset"),t=$.parseJSON(t.responseText),t.error?(0,s.default)("danger",t.error.message):(0,s.default)("danger",Translator.trans("thread.post.reply_error_hint"))}})}},{key:"undelegateEvents",value:function(t,e){this.ele.off(t,e)}}]),t}();e.default=i},"819d216bf25bb467929a":function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}var a=n("29cf60bbbbb4e174f0f6"),o=r(a),s=n("d5fb0e67d2d4c1ebaaed"),i=r(s);new o.default({element:".class-detail-content"});new i.default($("#thread-post-form"));var l=$(".js-only-teacher-div").html();$(".class-detail-content").find(".js-all-post-head").append(l),$(".class-detail-content").on("click",".js-only-teacher",function(){var t=$(this),e=t.hasClass("active")?"":"?adopted=1",n=t.data("url")+e;document.location.href=n});var u="";$(".class-detail-content").find(".thread-post").each(function(){u+=$(this).data("userId")+","}),u=u.substring(0,u.length-1),$.get($("#isTeachersUrl").val()+"?ids="+u,function(t){for(var e=t.split(","),n=0;n<e.length;n++)$(".class-detail-content").find(".user-id-"+e[n]).each(function(){$(this).addClass("teacher")})})}},["819d216bf25bb467929a"]);