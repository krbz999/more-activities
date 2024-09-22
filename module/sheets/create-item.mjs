export default class CreateItemActivitySheet extends dnd5e.applications.activity.ActivitySheet {
  /** @override */
  static PARTS = {
    ...super.PARTS,
    effect: {
      template: "modules/more-activities/templates/create-item.hbs"
    }
  };

  /* -------------------------------------------------- */

  /** @override */
  async _prepareEffectContext(context) {
    context = await super._prepareEffectContext(context);

    const a = this.activity;

    context.MA = {
      itemUuid: {
        field: a.schema.getField("itemUuid"),
        value: a.itemUuid
      }
    };

    return context;
  }
}
