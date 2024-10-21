import ConditionActivityData from "../models/condition.mjs";
import ConditionActivitySheet from "../sheets/condition.mjs";

export default class ConditionActivity extends dnd5e.documents.activity.ActivityMixin(ConditionActivityData) {
  /** @override */
  static LOCALIZATION_PREFIXES = [
    ...super.LOCALIZATION_PREFIXES,
    "MORE_ACTIVITIES.CONDITION"
  ];

  /* -------------------------------------------------- */

  /** @override */
  static metadata = Object.freeze(foundry.utils.mergeObject(super.metadata, {
    type: "ma-condition",
    img: "modules/more-activities/assets/snowflake.svg",
    title: "MORE_ACTIVITIES.CONDITION.Title",
    sheetClass: ConditionActivitySheet,
    usage: {
      actions: {
        maCondition: ConditionActivity.#execute
      }
    }
  }, {inplace: false}));

  /* -------------------------------------------------- */

  /** @override */
  _usageChatButtons(message) {
    return [{
      label: game.i18n.localize("MORE_ACTIVITIES.CONDITION.Button"),
      icon: "<i class='fa-solid fa-snowflake' inert></i>",
      dataset: {
        action: "maCondition"
      }
    }].concat(super._usageChatButtons(message));
  }

  /* -------------------------------------------------- */

  /**
   * @this {ConditionActivity}
   * @param {PointerEvent} event        Triggering click event.
   * @param {HTMLElement} target        The capturing HTML element which defined a [data-action].
   * @param {ChatMessage5e} message     Message associated with the activation.
   */
  static async #execute(event, target, message) {
    const effect = await ActiveEffect.implementation.fromStatusEffect(this.status);
    const roll = await Roll.create(this.rounds, this.actor.getRollData()).evaluate();
    const data = foundry.utils.mergeObject(effect.toObject(), {
      "duration.rounds": roll.total,
      origin: this.item.uuid
    });
    await roll.toMessage({
      flavor: game.i18n.localize("MORE_ACTIVITIES.CONDITION.Flavor"),
      speaker: ChatMessage.implementation.getSpeaker({actor: this.actor})
    });
    ActiveEffect.implementation.create(data, {parent: this.actor, keepId: true});
  }
}
