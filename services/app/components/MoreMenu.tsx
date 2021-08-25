import { Menu, MenuItem } from '@material-ui/core';

interface MoreMenuProps {
  menuAnchorEl: HTMLElement | null;
  onMenuClose: () => void;
  onRenameClick: () => void;
  onRemoveClick: () => void;
}
function MoreMenu({
  menuAnchorEl,
  onMenuClose,
  onRenameClick,
  onRemoveClick,
}: MoreMenuProps): JSX.Element {
  // const handleSaveClick = (event: React.MouseEvent<HTMLLIElement>) => {
  //   event.stopPropagation();
  //   onMenuClose();
  // };
  const handleRemoveClick = (event: React.MouseEvent<HTMLLIElement>) => {
    event.stopPropagation();
    onMenuClose();
    onRemoveClick();
  };
  const handleRenameClick = (event: React.MouseEvent<HTMLLIElement>) => {
    event.stopPropagation();
    onMenuClose();
    onRenameClick();
  };
  return (
    <Menu
      id="more-menu"
      anchorEl={menuAnchorEl}
      keepMounted={true}
      open={Boolean(menuAnchorEl)}
      onClose={(event, reason) => {
        // For backdrop clicks, stop propagation (if event has it).
        // Else, the accordion with think it was clicked and toggle.
        if (reason === 'backdropClick') {
          if (typeof (event as Event).stopPropagation === 'function') {
            (event as React.MouseEvent<HTMLElement>).stopPropagation();
          }
        }
        onMenuClose();
      }}
    >
      {/* <MenuItem onClick={handleSaveClick}>Save for Later</MenuItem> */}
      <MenuItem onClick={handleRemoveClick}>Remove from List</MenuItem>
      <MenuItem onClick={handleRenameClick}>Rename</MenuItem>
    </Menu>
  );
}

export default MoreMenu;
