import parseDynamicValue from "../parseDynamicValue";

export default function getElementFieldValue({
  element,
  fieldName,
  fieldConfig,
  profile,
}) {
  let value = null;

  if (!element.data) return null;

  if (element.data[fieldName]) {
    value = element.data[fieldName];
  } else if (fieldConfig.default) {
    value = fieldConfig.default;
  }

  return parseDynamicValue({ value: value, profile: profile });
}
