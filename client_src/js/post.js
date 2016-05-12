$( document ).ready( function () {
    var posts = Data.getPosts();
    var parameter = getQueryVariable('id');

    var postTemplateRaw = $('#post-template').html();
    var postRelatedTemplateRaw = $('#post-related-template').html();
    var postsRelatedTemplateRaw = $('#posts-related-list').html();
    var commentTemplateRaw = $('#comment-template').html();
    var commentRegularTemplateRaw = $('#comment-regular').html();
    var commentAnsweredTemplateRaw = $('#comments-answered').html();

    var postTemplate = Handlebars.compile(postTemplateRaw);
    var postRelatedTemplate = Handlebars.compile(postsRelatedTemplateRaw);
    var commentRegularTemplate = Handlebars.compile(commentRegularTemplateRaw);
    var commentAnsweredTemplate = Handlebars.compile(commentAnsweredTemplateRaw);

    Handlebars.registerPartial('post-related', postRelatedTemplateRaw);
    Handlebars.registerPartial('comment-view', commentTemplateRaw);

    render();

    function render() {
        renderPost();
        renderRelatedPosts();
        renderRegularComment();
        renderAnsweredComment();
    }

    function renderPost() {
        var html = postTemplate({
           post: Data.getPost()
        });

        jQuery('.post__container').html(html);
    }

    function renderRelatedPosts() {
        var postsRelated = Data.getRelatedPosts();

        var html = postRelatedTemplate({
            posts: postsRelated
        });

        jQuery('.posts-related__container').html(html);
    }

    function renderRegularComment() {
        console.log(Data.getPostComments()[0]);
        var html = commentRegularTemplate({
           comment: Data.getPostComments()[0]
        });

        jQuery('.comment-regular__container').html(html);
    }

    function renderAnsweredComment() {
        var html = commentAnsweredTemplate({
            comment: Data.getPostComments()[1]
        });

        jQuery('.comment-answered__container').html(html);
    }

    function getQueryVariable(variable) {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i=0;i<vars.length;i++) {
            var pair = vars[i].split("=");
            if (pair[0] == variable) {
                return pair[1];
            }
        }
        alert('Query Variable ' + variable + ' not found');
    }
});