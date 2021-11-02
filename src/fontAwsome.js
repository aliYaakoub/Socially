// import the library
import { library } from '@fortawesome/fontawesome-svg-core';
// import { library: library2 } from  '@fortawesome/free-brands-svg-icons';

// import your icons
import { faCode } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faPlusSquare, faComment } from '@fortawesome/free-regular-svg-icons';

library.add(
    // faHeart2,
    faPlusSquare,
    faComment,
    faCode,
    faGithub
  // more icons go here
);