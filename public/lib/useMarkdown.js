/**
 * Created by michael on 2014/9/19.
 */
(function () {
    var $ = function (id) { return document.getElementById(id); };
    function Editor(input, preview) {
        this.update = function () {
            var title = $('text-title').value,
                body = input.value.replace(/\n/g, '  \n');
            preview.innerHTML = markdown.toHTML( '# ' + title + '\n' + body);
        };
        input.editor = this;
        this.update();
    }
    new Editor($("text-input"), $("preview"));
})();