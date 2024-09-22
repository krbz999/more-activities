const {StringField} = foundry.data.fields;

export default class ConditionActivityData extends dnd5e.dataModels.activity.BaseActivityData {
  /** @override */
  static defineSchema() {
    return {
      ...super.defineSchema(),
      rounds: new dnd5e.dataModels.fields.FormulaField({required: true}),
      status: new StringField({
        choices: () => {
          return CONFIG.statusEffects.reduce((acc, {id, name}) => {
            acc[id] = name;
            return acc;
          }, {});
        }
      })
    };
  }
}
