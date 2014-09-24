/**
 * Created by michael on 2014/9/19.
 */
(function () {
    var $ = function (selector) { return document.querySelector(selector); };
    ($('.edit-area').preview = function () {
        $('#preview').innerHTML = marked('# ' + $('#text-title').value + '\n' + $('#text-body').value);
    })();
})();