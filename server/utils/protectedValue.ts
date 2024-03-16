export default function protectedValue(sensitiveValue: String | false) {
  if (sensitiveValue === false) return;

  return sensitiveValue && sensitiveValue.substring(0, 10) + '...';
}
