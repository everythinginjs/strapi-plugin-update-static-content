import pluginId from '../../pluginId';
import Config from '../../../../types/Config';
import {
  Table,
  TFooter,
  Thead,
  Tbody,
  Tr,
  Td,
  Th,
  Flex,
  Box,
  IconButton,
  Layout
} from '@strapi/design-system';
import { Plus, Trash } from '@strapi/icons';
import { getFetchClient } from '@strapi/helper-plugin';
import { Link } from 'react-router-dom';
import useFormattedLabel from '../../hooks/useFormattedLabel';
import { ConfirmModal } from '../ConfirmModal';
import PageLoading from '../PageLoading';
import useFetch from '../../hooks/useFetch';

export default function ConfigsTable() {
  const [data, isDataLoading, refetchData] = useFetch<Config[]>(`/${pluginId}/config`);
  const { del } = getFetchClient();

  console.log(data, isDataLoading);

  const CONFIRM_DELETE_TITLE = useFormattedLabel('settings.table.confirmDelete.title');
  const CONFIRM_DELETE = useFormattedLabel('settings.table.confirmDelete.confirm');

  async function handleDetete(id: string) {
    const deleteConfirm = await del(`/${pluginId}/config/${id}`);
    if (deleteConfirm) {
      try {
        refetchData();
      }
      catch (err) {
        console.error(err);
      }
    }
  }

  const COL_COUNT = 4;

  const FooterButton = () => {
    const FOOTER_LABEL = useFormattedLabel('settings.table.footer.label');
    return (
      <Link to={(location) => ({ ...location, pathname: `${location.pathname}/new-workflow` })}>
        <TFooter icon={<Plus />}>{FOOTER_LABEL}</TFooter>
      </Link>
    );
  };

  return isDataLoading ? (
    <PageLoading />
  ) : (
    <Layout>

    <Table colCount={COL_COUNT} footer={<FooterButton />}>
      <Thead>
        <Tr>
          <Th>Id</Th>
          <Th>GitHub Account</Th>
          <Th>Repo</Th>
          <Th>Branch</Th>
          <Th>Workflow</Th>
        </Tr>
      </Thead>
      <Tbody>
        {data &&
          data.map((config) => (
            <Tr key={config.id}>
              <Td>{config.id}</Td>
              <Td>{config.githubAccount}</Td>
              <Td>{config.repo}</Td>
              <Td>{config.branch}</Td>
              <Td>{config.workflow}</Td>
              <Td>
                <Flex>
                  <Box paddingLeft={1}>
                    <ConfirmModal
                      onConfirm={() => handleDetete(`${config.id}`)}
                      title={CONFIRM_DELETE_TITLE}
                      confirmMsg={CONFIRM_DELETE}
                    >
                      {(onOpen) => (
                        <IconButton onClick={onOpen} label="Delete" borderWidth={0}>
                          <Trash />
                        </IconButton>
                      )}
                    </ConfirmModal>
                  </Box>
                </Flex>
              </Td>
            </Tr>
          ))}
      </Tbody>
    </Table>
    </Layout>

  );
}
