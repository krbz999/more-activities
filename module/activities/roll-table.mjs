import RollTableActivityData from "../models/roll-table.mjs";
import RollTableActivitySheet from "../sheets/roll-table.mjs";

export default class RollTableActivity extends dnd5e.documents.activity.ActivityMixin(RollTableActivityData) {
  /** @override */
  static LOCALIZATION_PREFIXES = [
    ...super.LOCALIZATION_PREFIXES,
    "MORE_ACTIVITIES.ROLL_TABLE"
  ];

  /* -------------------------------------------------- */

  /** @override */
  static metadata = Object.freeze(foundry.utils.mergeObject(super.metadata, {
    type: "ma-roll-table",
    img: "icons/svg/dice-target.svg",
    title: "MORE_ACTIVITIES.ROLL_TABLE.Title",
    sheetClass: RollTableActivitySheet,
    usage: {
      actions: {
        maRollTable: RollTableActivity.#execute
      }
    }
  }, {inplace: false}));

  /* -------------------------------------------------- */

  /** @override */
  _usageChatButtons(message) {
    return [{
      label: game.i18n.localize("MORE_ACTIVITIES.ROLL_TABLE.Button"),
      icon: "<i class='fa-solid fa-dice' inert></i>",
      dataset: {
        action: "maRollTable"
      }
    }].concat(super._usageChatButtons(message));
  }

  /* -------------------------------------------------- */

  /**
   * @this {RollTableActivity}
   * @param {PointerEvent} event     Triggering click event.
   * @param {HTMLElement} target     The capturing HTML element which defined a [data-action].
   * @param {ChatMessage5e} message  Message associated with the activation.
   */
  static async #execute(event, target, message) {
    const table = await fromUuid(this.tableUuid);
    if (!table) return;
    table.draw();
  }
}
