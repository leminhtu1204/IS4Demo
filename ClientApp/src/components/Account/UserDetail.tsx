import React from "react";
import RootModal from "../Modal/RootModal";
import UserModalContent from "../Modal/UserModalContent";
import User from "../../types/Account/User";

interface UserDetailProps {
  isOpen: boolean;
  selectedUser: User;
  closeUserDetail: any;
}

export default class UserDetail extends React.Component<UserDetailProps> {
  constructor(props: UserDetailProps) {
    super(props);
  }

  render() {
    const isOpen = this.props.isOpen;
    const selectedUser = this.props.selectedUser;
    const closeUserDetail = this.props.closeUserDetail;
    const children = () =>{
      return ( <UserModalContent
        selectedUser={selectedUser}
        closeUserDetail={closeUserDetail}
      />)
    }
    return (
      <div>
        <RootModal isOpen={isOpen} title={"User Detail"}>
          <UserModalContent
            selectedUser={selectedUser}
            closeUserDetail={closeUserDetail}
          />
        </RootModal>
      </div>
    );
  }
}
