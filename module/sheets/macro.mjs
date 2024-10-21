export default class MacroActivitySheet extends dnd5e.applications.activity.ActivitySheet {
  /** @inheritDoc */
  static PARTS = {
    ...super.PARTS,
    effect: {
      template: "modules/more-activities/templates/macro.hbs"
    }
  };
}
