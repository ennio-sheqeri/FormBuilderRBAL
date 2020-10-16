(function() {

  // export only render
  var formBuilder = {
    render: genSectionView
  };
  if (window) {
    window.formBuilder = formBuilder;
  } else if (module && module.exports) {

    // nodejs, I think here has problem
    module.exports = formBuilder
  } 

  function isSection(o) {
    if (o.section && o.content) {
      if (Array.isArray(o.content)) {
        return true;
      }
    }
    return false;
  }

  function genSectionView(section, level) {
    var html = '';
    level = level || 1;
    var attrs = section.content;
    console.log(section);
    html += '<fieldset>';
    html += '<legend class="bold section-h' + level + '">' + section.section + '</legend>';
    html += '<div class="section-content">';
    for (var i = 0; i < attrs.length; i++) {
      if (isSection(attrs[i])) {
        html += arguments.callee(attrs[i], level+1);
      } else {
        html += genObjView(attrs[i]);
      }
    }
    html += '</div>';
    html += '</fieldset>';
    return html;
  }

  function qsStringify(o, label) {
    label = label || 'input';
    var html = '<' + label;
    for (var key in o) {
      if (o[key]) {

        if (['selected', 'checked', 'disable', 'readonly'].indexOf(key) != -1) {

          // o[key] should be true!
          html += ' ' + key;
        } else {
          // checkbox, radio cannot have value
          if (!(key == 'value' && o.type && (o.type == 'checkbox' || o.type == 'radio'))) {
            html += ' ' + key + '="' + o[key] + '"';
          }
        }
      }
    }
    html += ' />';
    return html;
  }

  function formatOptions(options) {
    for (var i = 0; i < options.length; i++) {
      var type = typeof(options[i]);
      if (type == 'string' || type == 'number') {
        var _o = {
          value: options[i],
          name: options[i]
        }
        options[i] = _o;
      }
    }
    return options;
  }

  function genObjView(o) {
    var html = '';
    o.label = o.label || o.name;
    html += '<div class="attr">';
    // type
    if ([undefined, 'input', 'select', 'range'].indexOf(o.type) != -1) {
      html += '<label class="full-width">';
      html += '<span class="attr-name">' + o.label + '</span>';
      if (o.type == 'select') {

        // select type, it has options
        html += '<select class="form-control">';
        if (Array.isArray(o.options) && o.options.length > 0) {
          for (var i = 0; i < o.options.length; i++) {
            html += '<option>' + o.options[i]  + '</option>';
          }
        }
        html += '</select>';

      } else {

        // input type
        o.type = o.type || 'text';
        var _o = {
          'type': o.type,
          'class': 'form-control',
          'name': o.name,
          'placeholder': o.placeholder,
          'value': o.value
        };
        if (o.type == 'range') {
          _o.max = o.max;
          _o.min = o.min;
        }
        html += qsStringify(_o);
      }
      html += '<label>';

    } else if (['radio', 'checkbox'].indexOf(o.type) != -1) {
      
      // radio, checkbox type, they have multi input options!
      html += '<span class="attr-name">' + o.name + '</span>';
      if (Array.isArray(o.options) && o.options.length > 0) {
        o.options = formatOptions(o.options);
        for (var i = 0; i < o.options.length; i++) {
          html += '<label class="' + o.type + '-inline">';
          html += qsStringify({
            'type': o.type,
            'name': o.name,
            'checked': o.value == o.options[i].value ? true : false,
            'value': o.options[i].value
          });
          html += ' ' + o.options[i].name;
          html += '</label>';
        }
      }
    }
    html += '</div>';
    return html;
  }

})();
