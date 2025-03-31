import * as __WEBPACK_EXTERNAL_MODULE__wordpress_interactivity_8e89b257__ from "@wordpress/interactivity";
/******/ var __webpack_modules__ = ({

/***/ "@wordpress/interactivity":
/*!*******************************************!*\
  !*** external "@wordpress/interactivity" ***!
  \*******************************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__wordpress_interactivity_8e89b257__;

/***/ })

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/make namespace object */
/******/ (() => {
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ })();
/******/ 
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*********************************!*\
  !*** ./src/polls-block/view.js ***!
  \*********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/interactivity */ "@wordpress/interactivity");

const {
  state
} = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.store)('buntywp-polls', {
  state: {
    get totalVoteCount() {
      const context = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getContext)();
      return context.totalVotes;
    },
    get userVoted() {
      const context = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getContext)();
      return context.userVoted;
    },
    get userSelection() {
      const context = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getContext)();
      const selected = parseInt(context.userSelection);
      const current = parseInt(context.options[context.item.id].id);
      return selected === current ? true : false;
    },
    get isPollOpen() {
      const context = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getContext)();
      return context.isPollOpen;
    }
  },
  actions: {
    toggleVote: () => {
      const context = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getContext)();

      // Return if poll is closed or already voted
      if (!context.isPollOpen || context.userVoted) {
        return;
      }
      let index = context.item.id;
      context.options[index].votes = (context.options[index].votes || 0) + 1;
      context.userSelection = context.options[index].id;
      context.options = context.options;
      context.totalVotes = Number(context.totalVotes + 1);
      context.userVoted = true;
      saveVoteToServer(context);
    },
    getPercentage: () => {
      const context = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getContext)();
      if (context.totalVotes === 0) {
        return '0%';
      }
      let index = context.item.id;
      const percentage = context.options[index].votes / context.totalVotes * 100;
      return `${percentage.toFixed(0)}%`;
    },
    initUserVoteState: () => {
      const context = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getContext)();
      const key_voted = `poll_voted_${context.blockId}`;
      const key_selection = `poll_selection_${context.blockId}`;
      if (localStorage.getItem(key_voted) === '1') {
        context.userVoted = true;
        context.userSelection = parseInt(localStorage.getItem(key_selection));
        localStorage.removeItem(key_voted);
        localStorage.removeItem(key_selection);
      }
    }
  },
  callbacks: {
    logIsPollOpen: () => {
      const {
        isOpen
      } = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getContext)();
    }
  }
});

/**
 * Save the vote to the server via AJAX.
 *
 * @param {object} context Poll Context.
 */
function saveVoteToServer(context) {
  fetch(state.ajaxUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      action: 'save_poll_vote',
      nonce: state.nonce,
      context: JSON.stringify(context)
    })
  }).then(response => response.json()).then(data => {
    console.log('Vote saved:', data);
    if (context.showResultsInNewPage) {
      localStorage.setItem(`poll_voted_${context.blockId}`, '1');
      localStorage.setItem(`poll_selection_${context.blockId}`, context.userSelection);
      window.location.reload();
    }
  }).catch(error => {
    console.error('Error saving vote:', error);
  });
}
})();


//# sourceMappingURL=view.js.map