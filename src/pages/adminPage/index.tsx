import React from 'react';
import { connect } from 'umi';
import { ConnectState } from '@/models/connect';
import { CurrentUser } from '@/models/user';

interface IAdminPageProps {
  currentUser?: Partial<CurrentUser>;
}

const AdminPage: React.FC<IAdminPageProps> = ({ currentUser }) => {
  return (
    <div>
      Hello AdminPage
      {JSON.stringify(currentUser)}
    </div>
  );
};

export default connect(({ user }: ConnectState) => ({
  currentUser: user.currentUser,
}))(AdminPage);
