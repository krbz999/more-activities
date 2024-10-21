import CreateItemActivityData from "../models/create-item.mjs";
import CreateItemActivitySheet from "../sheets/create-item.mjs";

export default class CreateItemActivity extends dnd5e.documents.activity.ActivityMixin(CreateItemActivityData) {
  /** @override */
  static LOCALIZATION_PREFIXES = [
    ...super.LOCALIZATION_PREFIXES,
    "MORE_ACTIVITIES.CREATE_ITEM"
  ];

  /* -------------------------------------------------- */

  /** @override */
  static metadata = Object.freeze(foundry.utils.mergeObject(super.metadata, {
    type: "ma-create-item",
    img: "modules/more-activities/assets/present.svg",
    title: "MORE_ACTIVITIES.CREATE_ITEM.Title",
    sheetClass: CreateItemActivitySheet,
    usage: {
      actions: {
        maCreateItem: CreateItemActivity.#execute
      }
    }
  }, {inplace: false}));

  /* -------------------------------------------------- */

  /** @override */
  _usageChatButtons(message) {
    return [{
      label: game.i18n.localize("MORE_ACTIVITIES.CREATE_ITEM.Button"),
      icon: "<i class='fa-solid fa-gift' inert></i>",
      dataset: {
        action: "maCreateItem"
      }
    }].concat(super._usageChatButtons(message));
  }

  /* -------------------------------------------------- */

  /**
   * @this {CreateItemActivity}
   * @param {PointerEvent} event     Triggering click event.
   * @param {HTMLElement} target     The capturing HTML element which defined a [data-action].
   * @param {ChatMessage5e} message  Message associated with the activation.
   */
  static async #execute(event, target, message) {
    const item = await fromUuid(this.itemUuid);
    if (!item) return;
    const itemData = await Item.implementation.createWithContents([item]);
    const actors = new Set();
    for (const {actor} of canvas.tokens.controlled) {
      if (!actor || actors.has(actor)) continue;
      actors.add(actor);
      Item.implementation.createDocuments(itemData, {keepId: true, parent: actor, maScrollingText: item.name});
    }
  }
}

/* -------------------------------------------------- */

/**
 * Display scrolling text when this activity creates an item.
 * @param {Item5e} item         The created item.
 * @param {object} context      The operation context.
 * @param {string} userId       Id of the user who created the item.
 */
Hooks.on("createItem", (item, context, userId) => {
  if (!item.isEmbedded || !context.maScrollingText) return;
  for (const token of item.actor.getActiveTokens(true)) {
    if (!token.visible || token.document.isSecret) continue;
    canvas.interface.createScrollingText(token.center, context.maScrollingText, {
      anchor: CONST.TEXT_ANCHOR_POINTS.CENTER,
      direction: CONST.TEXT_ANCHOR_POINTS.TOP,
      distance: (2 * token.h),
      fontSize: 18,
      stroke: 0x000000,
      strokeThickness: 2,
      jitter: 0
    });
  }
});
