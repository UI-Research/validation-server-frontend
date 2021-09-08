import { Menu, MenuItem } from '@material-ui/core';

export interface MoreMenuEventProps {
  onRemoveClick?: () => void;
  onRenameClick?: () => void;
  onSaveClick?: () => void;
}
interface MoreMenuProps extends MoreMenuEventProps {
  menuAnchorEl: HTMLElement | null;
  onMenuClose: () => void;
}
function MoreMenu({
  menuAnchorEl,
  onMenuClose,
  onRenameClick,
  onRemoveClick,
  onSaveClick,
}: MoreMenuProps): JSX.Element {
  const handleSaveClick = (event: React.MouseEvent<HTMLLIElement>) => {
    event.stopPropagation();
    onMenuClose();
    onSaveClick && onSaveClick();
  };
  const handleRemoveClick = (event: React.MouseEvent<HTMLLIElement>) => {
    event.stopPropagation();
    onMenuClose();
    onRemoveClick && onRemoveClick();
  };
  const handleRenameClick = (event: React.MouseEvent<HTMLLIElement>) => {
    event.stopPropagation();
    onMenuClose();
    onRenameClick && onRenameClick();
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
      {onSaveClick && (
        <MenuItem onClick={handleSaveClick}>Save for Later</MenuItem>
      )}
      {onRemoveClick && (
        <MenuItem onClick={handleRemoveClick}>Remove from List</MenuItem>
      )}
      {onRenameClick && <MenuItem onClick={handleRenameClick}>Rename</MenuItem>}
    </Menu>
  );
}

export default MoreMenu;
