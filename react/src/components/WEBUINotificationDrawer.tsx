import { useWebUINavigate } from '../hooks';
import { useBAINotification } from '../hooks/useBAINotification';
import BAINotificationItem from './BAINotificationItem';
import { MoreOutlined } from '@ant-design/icons';
import {
  Drawer,
  List,
  type DrawerProps,
  theme,
  Button,
  Segmented,
  Flex,
  Badge,
  Dropdown,
} from 'antd';
import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

type NotificationCategory = 'all' | 'in progress';
interface Props extends DrawerProps {}
const WEBUINotificationDrawer: React.FC<Props> = ({ ...drawerProps }) => {
  const { t } = useTranslation();
  const { token } = theme.useToken();

  const webuiNavigate = useWebUINavigate();

  const [notifications, { clearAllNotifications }] = useBAINotification();
  const [selectedCategory, setSelectedCategory] =
    useState<NotificationCategory>('all');

  const inProgressNotifications = useMemo(
    () =>
      notifications.filter((n) => {
        return n.backgroundTask?.status === 'pending';
      }),
    [notifications],
  );

  return (
    <Drawer
      title={t('notification.Notifications')}
      styles={{
        // mask: { backgroundColor: 'transparent' },
        body: {
          padding: 0,
          paddingLeft: token.paddingContentHorizontalSM,
          paddingRight: token.paddingContentHorizontalSM,
        },
        header: {
          padding: 15,
        },
      }}
      contentWrapperStyle={{ padding: 0 }}
      // comment out the following line because list item
      extra={
        <Dropdown
          trigger={['click']}
          menu={{
            items: [
              {
                key: 'clear-all',
                label: t('notification.ClearNotifications'),
                danger: true,
                onClick: clearAllNotifications,
              },
            ],
          }}
        >
          <Button
            type="text"
            icon={<MoreOutlined />}
            disabled={notifications.length === 0}
          />
        </Dropdown>
      }
      {...drawerProps}
    >
      <List
        itemLayout="vertical"
        dataSource={
          selectedCategory === 'all' ? notifications : inProgressNotifications
        }
        header={
          <Flex justify="end">
            <Segmented
              value={selectedCategory}
              onChange={(value) =>
                setSelectedCategory(value as NotificationCategory)
              }
              options={[
                {
                  value: 'all',
                  // icon: 'All
                  label: t('general.All'),
                },
                {
                  value: 'in progress',
                  label: (
                    <Badge dot={inProgressNotifications.length > 0}>
                      {t('general.InProgress')}
                    </Badge>
                  ),
                },
              ]}
            />
          </Flex>
        }
        rowKey={(item) => item.key}
        renderItem={(item) => (
          <BAINotificationItem
            notification={item}
            onClickAction={(e) => {
              item.toUrl && webuiNavigate(item.toUrl);
              drawerProps.onClose && drawerProps.onClose(e);
            }}
            showDate
          />
        )}
      />
    </Drawer>
  );
};

export default WEBUINotificationDrawer;
