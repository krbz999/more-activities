const {BooleanField, DocumentUUIDField, SchemaField, StringField} = foundry.data.fields;

export default class MacroActivityData extends dnd5e.dataModels.activity.BaseActivityData {
  /** @inheritDoc */
  static defineSchema() {
    return {
      ...super.defineSchema(),
      macro: new SchemaField({
        macroUuid: new DocumentUUIDField({type: "Macro"}),
        name: new StringField(),
        visible: new BooleanField()
      })
    };
  }
}
