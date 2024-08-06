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
  Layout,
} from '@strapi/design-system';
import { Plus, Trash } from '@strapi/icons';
import { getFetchClient } from '@strapi/helper-plugin';
import { Link } from 'react-router-dom';
import useFormattedLabel from '../../hooks/useFormattedLabel';
import PageLoading from '../PageLoading';
import useFetch from '../../hooks/useFetch';

const toggleConfirmDialog = () => {
  setIsConformDialogOpen((prev) => !prev);
};

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
                      <ConfirmDialog
                        bodyText={{
                          id: 'settings.table.confirmDelete.message',
                          defaultMessage: CONFIRM_DELETE_MESSAGE,
                        }}
                        title={{
                          id: 'settings.table.confirmDelete.title',
                          defaultMessage: useFormattedLabel('settings.table.confirmDelete.title')}
                        }
                        rightButtonText={
                          {
                            id: 'settings.table.confirmDelete.confirm',
                            defaultMessage: useFormattedLabel('settings.table.confirmDelete.confirm')
                          }
                        }
                        isOpen={isConfirmDialogOpen}
                        onToggleDialog={toggleConfirmDialog}
                        onConfirm={() => handleDetete(`${config.id}`)}
                      />
                      <IconButton onClick={toggleConfirmDialog} label="Delete" borderWidth={0}>
                        <Trash />
                      </IconButton>
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
