var SelectBoxesComponent = Formio.Components.components.selectboxes;

  function SelectImagesComponent(component, options, data) {
    SelectBoxesComponent.prototype.constructor.call(this, component, options, data);
  }
  
  SelectImagesComponent.prototype = Object.create(SelectBoxesComponent.prototype);
  SelectImagesComponent.prototype.constructor = SelectImagesComponent;
  
  SelectImagesComponent.schema = function() {
    return SelectBoxesComponent.schema({
      type: 'selectimages',
      input: true,
      persistent: true,
      label: 'Select Images'
    });
  };
  
  SelectImagesComponent.builderInfo = {
    title: 'Select Images',
    group: 'basic',
    icon: 'fa fa-image',
    weight: 70,
    documentation: 'http://help.form.io/userguide/#table',
    schema: SelectImagesComponent.schema()
  };
  
  SelectImagesComponent.prototype.getTemplate = function(names, mode) {
    if (names.indexOf('radio') !== -1) {
      return `<div class="form-radio radio">
        {% ctx.values.forEach(function(item) { %}
        <div class="form-check{{ctx.inline ? '-inline' : ''}}" ref="wrapper">
          <label class="form-check-label" for="{{ctx.id}}{{ctx.row}}-{{item.value}}">
            {% if (ctx.component.optionsLabelPosition === 'left' || ctx.component.optionsLabelPosition === 'top') { %}
            <span>{{ctx.t(item.label)}}</span>
            {% } %}
            <{{ctx.input.type}}
              ref="input"
              {% for (var attr in ctx.input.attr) { %}
              {{attr}}="{{ctx.input.attr[attr]}}"
              {% } %}
              value="{{item.value}}"
              {% if (ctx.value && (ctx.value === item.value || (typeof ctx.value === 'object' && ctx.value.hasOwnProperty(item.value) && ctx.value[item.value]))) { %}
                checked=true
              {% } %}
              id="{{ctx.id}}{{ctx.row}}-{{item.value}}"
            >
            {% if (!ctx.component.optionsLabelPosition || ctx.component.optionsLabelPosition === 'right' || ctx.component.optionsLabelPosition === 'bottom') { %}
            <img src="{{ item.image }}" /><span>{{ctx.t(item.label)}}</span>
            {% } %}
          </label>
        </div>
        {% }) %}
      </div>`;
    }
    else {
      return SelectBoxesComponent.prototype.getTemplate.call(this, names, mode);
    }
  };
  
  // Use the table component edit form.
  SelectImagesComponent.editForm = function() {
    var editForm = SelectBoxesComponent.editForm();
    var valuesComponent = FormioUtils.getComponent(editForm.components, 'values', true);
    valuesComponent.components[2] = {
      type: 'textfield',
      label: 'Image',
      key: 'image',
      input: true
    };
    return editForm;
  };
      
  Formio.Components.addComponent('selectimages', SelectImagesComponent);