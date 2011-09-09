/**
 * Copyright (c) 2011 The University of Queensland
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
(function($) {
  $.widget("w3cdtf.w3cdtf",
      {

        options : {
          minDate : new Date(0),
          maxDate : null,
        },

        _create : function() {
          var widget = $('<div/>');
          widget.addClass(this.widgetBaseClass);

          var iv = /^(\d*)-?(\d*)-?(\d*)$/.exec(this.element.val() + '');
          iv.shift(); // Remove complete match

          this.element.hide();

          this._current = {};
          _.each([ 'year', 'month', 'day' ], _.bind(function(v, i) {
            if (iv.length > 0) {
              this._current[v] = iv.shift();
            } else {
              this._current[v] = '';
            }
          }, this));

          this._widget = widget;
          this.refresh();
          this._widget.insertAfter(this.element);

        },

        _refreshInput : function() {
          var val = this._current.year;
          if (this._current.month != '') {
            val += '-' + this._current.month;
            if (this._current.day != '') {
              val += '-' + this._current.day;
            }
          }
          this.element.val(val);
          console.debug(this.element.val());
        },

        refresh : function() {
          this._widget.empty();
          this._selectors = {};

          var yearSelect = $('<select/>');
          yearSelect.addClass(this.widgetBaseClass + '-year');
          this._selectors.year = yearSelect;
          this._refreshYear();
          this._widget.append(yearSelect);

          var monthSelect = $('<select/>');
          monthSelect.addClass(this.widgetBaseClass + '-month');
          this._selectors.month = monthSelect;
          this._refreshMonth();
          this._widget.append(monthSelect);

          var daySelect = $('<select/>');
          daySelect.addClass(this.widgetBaseClass + '-day');
          this._selectors.day = daySelect;
          this._refreshDay();
          this._widget.append(daySelect);

          // Each time a selector changes, refresh the input element
          var handler = _.bind(this._refreshInput, this);
          _.each(this._selectors, function(v) {
            v.bind('change.input', handler);
          });
        },

        _refreshYear : function() {
          var yearSelect = this._selectors.year;
          yearSelect.empty();

          yearSelect.append($("<option/>").text(''));

          var maxDate = this.options.maxDate == null ? new Date()
              : this.options.maxDate;
          var minDate = this.options.minDate;

          var years = _.range(maxDate.getFullYear(), minDate.getFullYear() - 1,
              -1);
          $(this._getSelectorOptions(years, this._current.year)).appendTo(
              yearSelect);

          yearSelect.bind('change.selector', _.bind(function(eventObject) {
            this._current.year = eventObject.target.value;
            this._current.month = '';
            this._refreshMonth();
          }, this));
        },

        _refreshMonth : function() {
          var monthSelect = this._selectors.month;
          monthSelect.empty();
          monthSelect.append($("<option/>").text(''));

          var startIndex = 1;
          if (this._current.year == this.options.minDate.getFullYear()) {
            startIndex = this.options.minDate.getMonth() + 1;
          }

          var months = _.range(startIndex, 12 + 1, 1).map(function(n) {
            return n < 10 ? '0' + n : n;
          });
          $(this._getSelectorOptions(months, this._current.month)).appendTo(
              monthSelect);

          monthSelect.bind('change.selector', _.bind(function(eventObject) {
            this._current.month = eventObject.target.value;
            this._current.day = '';
            this._refreshDay();
          }, this));
        },

        _refreshDay : function() {
          var daySelect = this._selectors.day;
          daySelect.empty();
          var daysInMonth = function(year, month) {
            var dd = new Date(year, month, 0);
            return dd.getDate();
          };
          daySelect.append($("<option/>").text(''));

          var startIndex = 1;
          if (this._current.year == this.options.minDate.getFullYear()
              && parseInt(this._current.month, 10) == this.options.minDate
                  .getMonth() + 1) {
            startIndex = this.options.minDate.getDate();
          }
          var days = _.range(startIndex,
              daysInMonth(this._current.year, this._current.month) + 1).map(
              function(n) {
                return n < 10 ? '0' + n : n;
              });
          $(this._getSelectorOptions(days, this._current.day)).appendTo(
              daySelect);

          daySelect.bind('change.selector', _.bind(function(eventObject) {
            this._current.day = eventObject.target.value;
          }, this));

          daySelect.toggle(this._current.month != '');
        },

        _getSelectorOptions : function(values, current) {
          return _.map(values, function(v) {
            var option = $("<option/>").text(v);
            if (v == current) {
              option.attr('selected', '');
            }
            return option.get(0);
          });
        }

      });
})(jQuery);