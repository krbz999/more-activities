export default class RollTableActivitySheet extends dnd5e.applications.activity.ActivitySheet {
  /** @override */
  static PARTS = {
    ...super.PARTS,
    effect: {
      template: "modules/more-activities/templates/roll-table.hbs"
    }
  };

  /* -------------------------------------------------- */

  /** @override */
  async _prepareEffectContext(context) {
    context = await super._prepareEffectContext(context);

    const a = this.activity;

    context.MA = {
      tableUuid: {
        field: a.schema.getField("tableUuid"),
        value: a.tableUuid
      }
    };

    return context;
  }
}
