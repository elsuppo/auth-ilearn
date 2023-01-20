const TableUsersBody = (props) => {
  const { users, onSelectOneUser } = props;

  const formatDate = (date) => {
    return date.slice(0, 10);
  }

  return users.map((user, i) => {
    return (
      <tr key={i}>
        <td>
          <input
            className="form-check-input"
            role="button"
            type="checkbox"
            id={user._id}
            onClick={onSelectOneUser}></input>
        </td>
        <td>{user._id}</td>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{formatDate(user.dateReg)}</td>
        <td>{formatDate(user.dateLastLogin)}</td>
        <td>{user.statusUser}</td>
      </tr>
    )
  })
}

export default TableUsersBody;