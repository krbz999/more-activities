export default class ConditionActivitySheet extends dnd5e.applications.activity.ActivitySheet {
  /** @override */
  static PARTS = {
    ...super.PARTS,
    effect: {
      template: "modules/more-activities/templates/condition.hbs"
    }
  };

  /* -------------------------------------------------- */

  /** @override */
  async _prepareEffectContext(context) {
    context = await super._prepareEffectContext(context);

    const a = this.activity;

    const dur = a.schema.getField("rounds");
    const sta = a.schema.getField("status");

    context.MA = {
      rounds: {field: dur, value: a.rounds},
      status: {field: sta, value: a.status}
    };

    return context;
  }
}
