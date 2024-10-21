import MacroActivityData from "../models/macro.mjs";
import MacroActivitySheet from "../sheets/macro.mjs";

export default class MacroActivity extends dnd5e.documents.activity.ActivityMixin(MacroActivityData) {
  /** @inheritDoc */
  static LOCALIZATION_PREFIXES = [
    ...super.LOCALIZATION_PREFIXES,
    "MORE_ACTIVITIES.MACRO"
  ];

  /* -------------------------------------------------- */

  /** @inheritDoc */
  static metadata = Object.freeze(foundry.utils.mergeObject(super.metadata, {
    type: "ma-macro",
    img: "modules/more-activities/assets/computing.svg",
    title: "DOCUMENT.Macro",
    sheetClass: MacroActivitySheet,
    usage: {
      actions: {
        maMacro: MacroActivity.#execute
      }
    }
  }, {inplace: false}));

  /* -------------------------------------------------- */

  /** @override */
  _usageChatButtons(message) {
    if (!this.macro.macroUuid) return super._usageChatButtons(message);
    return [{
      label: this.macro.name || game.i18n.localize("DOCUMENT.Macro"),
      icon: "<i class='fa-solid fa-code' inert></i>",
      dataset: {
        action: "maMacro",
        visibility: this.macro.visible ? "all" : undefined
      }
    }].concat(super._usageChatButtons(message));
  }

  /* -------------------------------------------------- */

  /**
   * @this {CreateItemActivity}
   * @param {PointerEvent} event        Triggering click event.
   * @param {HTMLElement} target        The capturing HTML element which defined a [data-action].
   * @param {ChatMessage5e} message     Message associated with the activation.
   */
  static async #execute(event, target, message) {
    const macro = await fromUuid(this.macro.macroUuid);
    if (!macro) {
      console.warn(`No macro defined for the activity ${this.name} on ${this.item.name} (${this.macroUuid}).`);
      return;
    }

    const actor = this.actor;
    const item = this.item;
    const activity = this;
    const speaker = ChatMessage.implementation.getSpeaker({actor: actor});
    const token = (actor.isToken ? actor.token?.object : actor.getActiveTokens()[0]) ?? null;
    macro.execute({actor, item, activity, speaker, event, message, macro, token});
  }
}
