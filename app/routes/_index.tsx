import { json } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { Table, Input, Form as AntForm, Card, Divider, Button } from 'antd';
import { Select } from '~/components/Select';
import { todoService } from '~/services/TodoService';
import { formDataToObject } from '~/utils/formDataToObject';
import type { V2_MetaFunction, ActionFunction } from '@remix-run/node';
import type { Todo } from '~/models/Todo';

export const meta: V2_MetaFunction = () => {
  return [{ title: 'New Remix App' }];
};

interface PageProps {
  todos: Todo[];
}

export const action: ActionFunction = async ({ request }) => {
  const body = await request.formData();
  console.log(111, formDataToObject(body));
  return json({ message: 'Created' });
};

export const loader = async () => {
  const todos = await todoService.getAll();
  return json<PageProps>({
    todos,
  });
};

export default function Index() {
  const { todos } = useLoaderData<typeof loader>();

  return (
    <div style={{ padding: 24 }}>
      <Card title="New todo">
        <Form method="POST">
          <AntForm.Item label="Title">
            <Input name="title" />
          </AntForm.Item>
          <AntForm.Item label="Description">
            <Input.TextArea name="description" />
          </AntForm.Item>
          <AntForm.Item label="Assign to">
            <Select
              mode="multiple"
              name="assign_to"
              options={[
                { value: '1', label: 'User 1' },
                { value: '2', label: 'User 2' },
                { value: '3', label: 'User 3' },
                { value: '4', label: 'User 4' },
                { value: '5', label: 'User 5' },
                { value: '6', label: 'User 6' },
                { value: '7', label: 'User 7' },
                { value: '8', label: 'User 8' },
                { value: '9', label: 'User 9' },
                { value: '10', label: 'User 10' },
              ]}
            />
          </AntForm.Item>
          <input
            type="hidden"
            name="attachment"
            value={JSON.stringify({
              id: '1',
              url: 'https://www.pexels.com/vi-vn/anh/dan-ba-trang-ph-c-tr-i-xanh-d-p-13703765/',
            })}
          />
          <input
            type="hidden"
            name="attachments"
            value={JSON.stringify([
              {
                id: '1',
                url: 'https://www.pexels.com/vi-vn/anh/dan-ba-trang-ph-c-tr-i-xanh-d-p-13703765/',
              },
              {
                id: '2',
                url: 'https://www.pexels.com/vi-vn/anh/dan-ba-trang-ph-c-tr-i-xanh-d-p-13703765/',
              },
            ])}
          />
          <Button htmlType="submit">Create</Button>
        </Form>
      </Card>
      <Divider />
      <Table
        columns={[
          {
            title: 'ID',
            render: (_, record) => {
              return <div>{record.id}</div>;
            },
          },
          {
            title: 'Title',
            render: (_, record) => {
              return <div>{record.title}</div>;
            },
          },
          {
            title: 'Description',
            render: (_, record) => {
              return <div>{record.description}</div>;
            },
          },
        ]}
        dataSource={todos}
        rowKey={record => record.id}
      />
    </div>
  );
}
