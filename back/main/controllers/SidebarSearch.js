const $ = require('jquery');
const { trim } = require('jquery');

const NAME = 'SidebarSearch';
const DATA_KEY = 'lte.sidebar-search';
const JQUERY_NO_CONFLICT = $.fn[NAME];

const CLASS_NAME_OPEN = 'sidebar-search-open';
const CLASS_NAME_ICON_SEARCH = 'fa-search';
const CLASS_NAME_ICON_CLOSE = 'fa-times';
const CLASS_NAME_HEADER = 'nav-header';
const CLASS_NAME_SEARCH_RESULTS = 'sidebar-search-results';
const CLASS_NAME_LIST_GROUP = 'list-group';

const SELECTOR_DATA_WIDGET = '[data-widget="sidebar-search"]';
const SELECTOR_SIDEBAR = '.main-sidebar .nav-sidebar';
const SELECTOR_NAV_LINK = '.nav-link';
const SELECTOR_NAV_TREEVIEW = '.nav-treeview';
const SELECTOR_SEARCH_INPUT = `${SELECTOR_DATA_WIDGET} .form-control`;
const SELECTOR_SEARCH_BUTTON = `${SELECTOR_DATA_WIDGET} .btn`;
const SELECTOR_SEARCH_ICON = `${SELECTOR_SEARCH_BUTTON} i`;
const SELECTOR_SEARCH_LIST_GROUP = `.${CLASS_NAME_LIST_GROUP}`;
const SELECTOR_SEARCH_RESULTS = `.${CLASS_NAME_SEARCH_RESULTS}`;
const SELECTOR_SEARCH_RESULTS_GROUP = `${SELECTOR_SEARCH_RESULTS} .${CLASS_NAME_LIST_GROUP}`;

const Default = {
  arrowSign: '->',
  minLength: 3,
  maxResults: 7,
  highlightName: true,
  highlightPath: false,
  highlightClass: 'text-light',
  notFoundText: 'No element found!',
};

const SearchItems = [];

// Class Definition
class SidebarSearch {
  constructor(_element, _options) {
    this.element = _element;
    this.options = $.extend({}, Default, _options);
    this.items = [];
  }

  // Public
  init() {
    if ($(SELECTOR_DATA_WIDGET).length === 0) {
      return;
    }

    if ($(SELECTOR_DATA_WIDGET).next(SELECTOR_SEARCH_RESULTS).length === 0) {
      $(SELECTOR_DATA_WIDGET).after(
        $('<div />', { class: CLASS_NAME_SEARCH_RESULTS })
      );
    }

    if ($(SELECTOR_SEARCH_RESULTS).children(SELECTOR_SEARCH_LIST_GROUP).length === 0) {
      $(SELECTOR_SEARCH_RESULTS).append(
        $('<div />', { class: CLASS_NAME_LIST_GROUP })
      );
    }

    this._addNotFound();

    $(SELECTOR_SIDEBAR).children().each((i, child) => {
      this._parseItem(child);
    });
  }

  search() {
    const searchValue = $(SELECTOR_SEARCH_INPUT).val().toLowerCase();
    if (searchValue.length < this.options.minLength) {
      $(SELECTOR_SEARCH_RESULTS_GROUP).empty();
      this._addNotFound();
      this.close();
      return;
    }

    const searchResults = SearchItems.filter((item) =>
      item.name.toLowerCase().includes(searchValue)
    );
    const endResults = $(searchResults.slice(0, this.options.maxResults));
    $(SELECTOR_SEARCH_RESULTS_GROUP).empty();

    if (endResults.length === 0) {
      this._addNotFound();
    } else {
      endResults.each((i, result) => {
        $(SELECTOR_SEARCH_RESULTS_GROUP).append(
          this._renderItem(escape(result.name), encodeURI(result.link), result.path)
        );
      });
    }

    this.open();
  }

  open() {
    $(SELECTOR_DATA_WIDGET).parent().addClass(CLASS_NAME_OPEN);
    $(SELECTOR_SEARCH_ICON)
      .removeClass(CLASS_NAME_ICON_SEARCH)
      .addClass(CLASS_NAME_ICON_CLOSE);
  }

  close() {
    $(SELECTOR_DATA_WIDGET).parent().removeClass(CLASS_NAME_OPEN);
    $(SELECTOR_SEARCH_ICON)
      .removeClass(CLASS_NAME_ICON_CLOSE)
      .addClass(CLASS_NAME_ICON_SEARCH);
  }

  toggle() {
    if ($(SELECTOR_DATA_WIDGET).parent().hasClass(CLASS_NAME_OPEN)) {
      this.close();
    } else {
      this.open();
    }
  }

  // Private
  _parseItem(item, path = []) {
    if ($(item).hasClass(CLASS_NAME_HEADER)) {
      return;
    }

    const itemObject = {};
    const navLink = $(item).clone().find(`> ${SELECTOR_NAV_LINK}`);
    const navTreeview = $(item).clone().find(`> ${SELECTOR_NAV_TREEVIEW}`);

    const link = navLink.attr('href');
    const name = navLink.find('p').children().remove().end().text();

    itemObject.name = this._trimText(name);
    itemObject.link = link;
    itemObject.path = path;

    if (navTreeview.length === 0) {
      SearchItems.push(itemObject);
    } else {
      const newPath = itemObject.path.concat([itemObject.name]);
      navTreeview.children().each((i, child) => {
        this._parseItem(child, newPath);
      });
    }
  }

  _trimText(text) {
    return text.replace(/(\r\n|\n|\r)/gm, ' ').trim();
  }

  _renderItem(name, link, path) {
    path = path.join(` ${this.options.arrowSign} `);

    try {
        name = decodeURIComponent(name);
    } catch (e) {
        console.warn("Invalid URI encoding in name:", name);
    }

    try {
        link = decodeURIComponent(link);
    } catch (e) {
        console.warn("Invalid URI encoding in link:", link);
    }

    if (this.options.highlightName || this.options.highlightPath) {
        const searchValue = $(SELECTOR_SEARCH_INPUT).val().toLowerCase();
        const regExp = new RegExp(searchValue, 'gi');

        if (this.options.highlightName) {
            name = name.replace(
                regExp,
                (str) => `<strong class="${this.options.highlightClass}">${str}</strong>`
            );
        }

        if (this.options.highlightPath) {
            path = path.replace(
                regExp,
                (str) => `<strong class="${this.options.highlightClass}">${str}</strong>`
            );
        }
    }

    const groupItemElement = $('<a/>', {
        href: link,
        class: 'list-group-item',
    });
    const searchTitleElement = $('<div/>', {
        class: 'search-title',
    }).html(name);
    const searchPathElement = $('<div/>', {
        class: 'search-path',
    }).html(path);

    groupItemElement.append(searchTitleElement).append(searchPathElement);

    return groupItemElement;
}


  _addNotFound() {
    $(SELECTOR_SEARCH_RESULTS_GROUP).append(
      this._renderItem(this.options.notFoundText, '#', [])
    );
  }

  // Static
  static _jQueryInterface(config) {
    let data = $(this).data(DATA_KEY);

    if (!data) {
      data = $(this).data();
    }

    const _options = $.extend({}, Default, typeof config === 'object' ? config : data);
    const plugin = new SidebarSearch($(this), _options);

    $(this).data(DATA_KEY, typeof config === 'object' ? config : data);

    if (typeof config === 'string' && /init|toggle|close|open|search/.test(config)) {
      plugin[config]();
    } else {
      plugin.init();
    }
  }
}

// Data API
$(document).on('click', SELECTOR_SEARCH_BUTTON, (event) => {
  event.preventDefault();
  SidebarSearch._jQueryInterface.call($(SELECTOR_DATA_WIDGET), 'toggle');
});

$(document).on('keyup', SELECTOR_SEARCH_INPUT, (event) => {
  if (event.key === 'ArrowUp') {
    event.preventDefault();
    $(SELECTOR_SEARCH_RESULTS_GROUP).children().last()[0]?.focus({ preventScroll: true });
    return;
  }

  if (event.key === 'ArrowDown') {
    event.preventDefault();
    $(SELECTOR_SEARCH_RESULTS_GROUP).children().first()[0]?.focus({ preventScroll: true });
    return;
  }

  setTimeout(() => {
    SidebarSearch._jQueryInterface.call($(SELECTOR_DATA_WIDGET), 'search');
  }, 100);
});

$(document).on('keydown', SELECTOR_SEARCH_RESULTS_GROUP, (event) => {
  const $focused = $(':focus');

  if (event.key === 'ArrowUp') {
    event.preventDefault();
    $focused.is(':first-child')
      ? $focused.siblings().last()[0]?.focus({ preventScroll: true })
      : $focused.prev()[0]?.focus({ preventScroll: true });
  }

  if (event.key === 'ArrowDown') {
    event.preventDefault();
    $focused.is(':last-child')
      ? $focused.siblings().first()[0]?.focus({ preventScroll: true })
      : $focused.next()[0]?.focus({ preventScroll: true });
  }
});

$(window).on('load', () => {
  SidebarSearch._jQueryInterface.call($(SELECTOR_DATA_WIDGET), 'init');
});

// jQuery API
$.fn[NAME] = SidebarSearch._jQueryInterface;
$.fn[NAME].Constructor = SidebarSearch;
$.fn[NAME].noConflict = function () {
  $.fn[NAME] = JQUERY_NO_CONFLICT;
  return SidebarSearch._jQueryInterface;
};

module.exports = SidebarSearch;
