const {DocumentUUIDField} = foundry.data.fields;

export default class CreateItemActivityData extends dnd5e.dataModels.activity.BaseActivityData {
  /** @override */
  static defineSchema() {
    return {
      ...super.defineSchema(),
      itemUuid: new DocumentUUIDField({type: "Item", embedded: false})
    };
  }
}
