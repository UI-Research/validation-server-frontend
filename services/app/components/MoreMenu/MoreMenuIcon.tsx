import { IconButton } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import { Fragment, useState } from 'react';
import MoreMenu, { MoreMenuEventProps } from '.';

type MoreMenuIconProps = MoreMenuEventProps;
function MoreMenuIcon({
  onRemoveClick,
  onRenameClick,
  onSaveClick,
}: MoreMenuIconProps): JSX.Element | null {
  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLButtonElement | null>(
    null,
  );

  // If none of the click handlers were defined, then do not show anything
  // as the more menu will be empty.
  if (!onRemoveClick && !onRenameClick && !onSaveClick) {
    return null;
  }

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setMenuAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };
  return (
    <Fragment>
      <IconButton
        aria-label="More"
        aria-controls="more-menu"
        aria-haspopup="true"
        title="More actions"
        onClick={handleMenuClick}
      >
        <MoreVert />
      </IconButton>
      <MoreMenu
        menuAnchorEl={menuAnchorEl}
        onMenuClose={handleMenuClose}
        onRemoveClick={onRemoveClick}
        onRenameClick={onRenameClick}
        onSaveClick={onSaveClick}
      />
    </Fragment>
  );
}

export default MoreMenuIcon;
