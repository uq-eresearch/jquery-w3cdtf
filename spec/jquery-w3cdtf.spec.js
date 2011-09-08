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

    $(initialElement).w3cdtf({});

    expect($('input:hidden').length).toBe(1);
    expect($('div', wrapper).length).toBe(1);

    wrapper.remove();
  });

  describe('population behaviour', function() {
    var wrapper = null;
    var initialElement = null;

    beforeEach(function() {
      wrapper = $('<div/>');
      $('body').append(wrapper);
      initialElement = $('<input type="text" name="foo"/>');
      wrapper.append(initialElement);
    });

    it('should handle a single year', function() {
      initialElement.val('1985');
      $(initialElement).w3cdtf({});

      expect($('div select:eq(0)', wrapper).val()).toBe('1985');
      expect($('div select:eq(1)', wrapper).val()).toBe('');
      expect($('div select:eq(2)', wrapper).val()).toBe('');

      expect(initialElement.val()).toBe('1985');
    });

    it('should handle a year with a month', function() {
      initialElement.val('1983-08');
      $(initialElement).w3cdtf({});

      expect($('div select:eq(0)', wrapper).val()).toBe('1983');
      expect($('div select:eq(1)', wrapper).val()).toBe('08');
      expect($('div select:eq(2)', wrapper).val()).toBe('');

      expect(initialElement.val()).toBe('1983-08');
    });

    it('should handle a year, month & day', function() {
      initialElement.val('2001-09-11');
      $(initialElement).w3cdtf({});

      expect($('div select:eq(0)', wrapper).val()).toBe('2001');
      expect($('div select:eq(1)', wrapper).val()).toBe('09');
      expect($('div select:eq(2)', wrapper).val()).toBe('11');

      expect(initialElement.val()).toBe('2001-09-11');
    });

    afterEach(function() {
      wrapper.remove();
    });

  });

});