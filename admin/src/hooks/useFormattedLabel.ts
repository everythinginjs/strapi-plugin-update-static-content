import { useIntl } from 'react-intl';
import getTrad from '../utils/getTrad';

export default function useFormattedLabel(labelId: string) {
  const { formatMessage } = useIntl();
  const label = formatMessage({ id: getTrad(labelId) });
  return label;
}
