import { Fragment, useState } from 'react';
import MoreMenu, { MoreMenuEventProps } from '.';
import UIButton from '../UIButton';

type MoreMenuButtonProps = MoreMenuEventProps;
function MoreMenuButton({
  onRemoveClick,
  onRenameClick,
  onSaveClick,
}: MoreMenuButtonProps): JSX.Element | null {
  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLButtonElement | null>(
    null,
  );

  // If none of the click handlers were defined, then do not show anything
  // as the more menu will be empty.
  if (!onRemoveClick && !onRenameClick && !onSaveClick) {
    return null;
  }

  const handleMoreButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.stopPropagation();
    setMenuAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  return (
    <Fragment>
      <UIButton
        title="More Actions"
        icon="MoreVert"
        aria-label="More"
        aria-controls="more-menu"
        aria-haspopup="true"
        onClick={handleMoreButtonClick}
      />
      <MoreMenu
        menuAnchorEl={menuAnchorEl}
        onMenuClose={handleMenuClose}
        onRenameClick={onRenameClick}
        onRemoveClick={onRemoveClick}
        onSaveClick={onSaveClick}
      />
    </Fragment>
  );
}

export default MoreMenuButton;
