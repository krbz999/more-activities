const {DocumentUUIDField} = foundry.data.fields;

export default class RollTableActivityData extends dnd5e.dataModels.activity.BaseActivityData {
  /** @override */
  static defineSchema() {
    return {
      ...super.defineSchema(),
      tableUuid: new DocumentUUIDField({type: "RollTable"})
    };
  }
}
