(function ($) {

  Drupal.form_placeholder = {};

  Drupal.form_placeholder.elementIsSupported = function ($element) {
    return $element.is('input[type=text], input[type=date], input[type=email], input[type=url], input[type=tel], input[type=password], textarea');
  };

  Drupal.form_placeholder.placeholderIsSupported = function () {
    // Opera Mini v7 doesn’t support placeholder although its DOM seems to
    // indicate so.
    var isOperaMini = Object.prototype.toString.call(window.operamini) == '[object OperaMini]';
    return 'placeholder' in document.createElement('input') && !isOperaMini;
  };

  Drupal.behaviors.form_placeholder = {
    attach: function (context, settings) {
      // In some cases settings after ajax form submit could contain only
      // settings from response but not all Drupal.settings data.
      if (!settings.hasOwnProperty('form_placeholder')) {
        settings = Drupal.settings;
      }
      var include = settings.form_placeholder.include;
      if (include) {
        include += ', ';
      }
      include += '.form-placeholder-include-children *';
      include += ', .form-placeholder-include';
      var exclude = settings.form_placeholder.exclude;
      if (exclude) {
        exclude += ', ';
      }
      exclude += '.form-placeholder-exclude-children *';
      exclude += ', .form-placeholder-exclude';
      exclude += ', .form-placeholder-processed';

      var required_indicator = settings.form_placeholder.required_indicator;

      $(include).not(exclude).each(function () {
        var $textfield = $(this);
        var elementSupported = Drupal.form_placeholder.elementIsSupported($textfield);
        var placeholderSupported = Drupal.form_placeholder.placeholderIsSupported();

        // Check if element support placeholder attribute.
        if (!elementSupported) {
          return;
        }
        // Placeholder is supported.
        else if (placeholderSupported || settings.form_placeholder.fallback_support) {
          var $form = $textfield.closest('form');
          var $label = $form.find('label[for=' + this.id + ']');

          if (required_indicator === 'append') {
            $label.find('.form-required').insertAfter($textfield).prepend('&nbsp;');
          }
          else if (required_indicator === 'remove') {
            $label.find('.form-required').remove();
          }
          else if (required_indicator === 'text') {
            $label.find('.form-required').text('(' + Drupal.t('required') + ')');
          }

          if (!$textfield.attr('placeholder')) {
            $textfield.attr('placeholder', $.trim($label.text()));
          //  $label.addClass('element-invisible');
          }

          // Fallback support for older browsers.
          if (!placeholderSupported && settings.form_placeholder.fallback_support) {
            $textfield.placeholder();
          }
          $textfield.addClass('form-placeholder-processed');
        }
      });
    }
  };

})(jQuery);
