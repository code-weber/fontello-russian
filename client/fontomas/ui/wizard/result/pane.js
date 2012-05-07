/*global window, nodeca, jQuery, Handlebars, Backbone, $, _*/

"use strict";


function start_download(id, url) {
  if ($('iframe#' + id).length) {
    // duplicate
    return;
  }

  $('<iframe></iframe>').attr({id: id, src: url}).css('display', 'none')
    .appendTo(window.document.body);
}


module.exports = Backbone.View.extend({
  // Use existing DOM element instead of generating a new one.
  el: '#result',


  // Deleagate some event handlers for some child elements.
  events: {
    'click #result-download': 'onDownload'
  },


  /**
    *  new ui.wizard.result.pane()
    *
    *  View constructor.
    */
  initialize: function () {
    this.$glyphs = this.$('#result-font');

    this.model.glyphs.on('add', this.addGlyph, this);
  },


  /**
    *  ui.wizard.result.pane#addGlyph(glyph) -> Void
    *
    *  Creates corresponding view for given glyph.
    *
    *  ##### See Also:
    *
    *  - [[ui.wizard.result.glyph]]
    */
  addGlyph: function (glyph) {
    var view = new nodeca.client.fontomas.ui.wizard.result.glyph({model: glyph});
    this.$glyphs.append(view.el);
  },


  /**
    *  ui.wizard.result.pane#onDownload(event) -> Void
    *
    *  Download button click handler
    */
  onDownload: function (event) {
    event.preventDefault();
    nodeca.server.fontomas.font.generate(this.model.getFontConfig(), function (err, msg) {
      var font_id = msg.data.id;

      if (err) {
        // TODO: notification about error
        nodeca.logger.error(err);
        return;
      }

      function poll_status() {
        nodeca.server.fontomas.font.status({id: font_id}, function (err, msg) {
          if (err) {
            // TODO: notification about error
            nodeca.logger.error(err);
            return;
          }

          if ('error' === msg.data.status) {
            // TODO: notification about error
            nodeca.logger.error(msg.data.error || "Unexpected error.");
            return;
          }

          if ('finished' === msg.data.status) {
            // TODO: normal notification about success
            nodeca.logger.info("Font successfully generated. " +
                               "Your download link: " + msg.data.url);
            start_download(font_id, msg.data.url);
            return;
          }

          if ('enqueued' === msg.data.status) {
            // TODO: notification about queue
            if (-1 === msg.data.position) {
              nodeca.logger.info("Your request is in progress nd will be available soon.");
            } else {
              nodeca.logger.info("Your request is in queue. " +
                                "Your turn number is " + msg.data.position);
            }

            // try in next 5 seconds
            setTimeout(poll_status, 5000);
            return;
          }

          // Unexpected behavior
          nodeca.logger.error("Unexpected behavior");
        });
      }

      poll_status();
    });
  }
});
