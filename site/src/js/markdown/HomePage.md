# Download

```bash
npm install react-popover-control
```

# Usage

```javascript
import Popover from 'react-popover-control';

actions = [
  {
    title: 'Edit',
    func: () => {
      ...
    }
  },
  {
    title: 'Delete',
    func: () => {
      ...
    }
  }
];

class Page extends React.Component {
  render() {
    return (
      <Popover actions={actions}>
        <a>Click Here</a>
      </Popover>
    )
  }
}
```

# Styling

Default styles are included in `css/ReactPopoverControl.scss`.

If you are using webpack with sass-loader, you can load the style in like this:

```javascript
require('react-popover-control/css/ReactPopoverControl.scss')
```

# A good popover...

- Flips when it is too low on screen
- Nudges left when it is too far right on screen
- Responds to clicks outside of its bounds
- Responds to keyboard shortcuts like ESC

# Things still missing

- Arrow key control
- Scrolling when there are too many items
- Using keyboard letters as shortcuts to certain fields
- Filtering items with an input field