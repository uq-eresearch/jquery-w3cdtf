describe('jquery-w3cdtf', function() {

  it('is a jquery plugin', function() {
    expect(typeof ($.fn.w3cdtf)).toBe('function');
  });

  it('hides the existing class and adds a div', function() {
    var wrapper = $('<div/>');
    $('body').append(wrapper);
    var initialElement = $('<input type="text" name="foo" value="1982"/>');
    wrapper.append(initialElement);
    expect($('input:hidden').length).toBe(0);
    expect($('div', wrapper).length).toBe(0);

    var result = $(initialElement).w3cdtf({});

    expect($('input:hidden').length).toBe(1);
    expect($('div', wrapper).length).toBe(1);

    console.debug(wrapper);
    // $('body').remove(wrapper);
  });

});