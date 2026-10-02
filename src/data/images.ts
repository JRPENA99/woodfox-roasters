/**
 * Every photograph on the site is referenced from this one file.
 *
 * All current images are PLACEHOLDERS from Unsplash (free licence) and
 * should be replaced with Woodfox-owned photography. To swap one:
 *   1. Put the new file in /public/media/images/ (e.g. cherries.jpg)
 *   2. Change `src` below to '/media/images/cherries.jpg'
 *   3. Update `alt` to describe the new photo
 * Nothing else needs to change. See docs/MEDIA.md.
 */

export type Photo = {
  src: string;
  alt: string;
  /** CSS object-position, used to steer cropping on narrow screens. */
  position?: string;
  placeholder?: boolean;
};

const unsplash = (id: string) => `https://images.unsplash.com/${id}`;

export const images = {
  heroPoster: {
    src: '/media/images/hero-poster.jpg',
    alt: 'Hands picking ripe coffee cherries from the plant',
    position: '60% 50%',
  },
  cherriesRipe: {
    src: unsplash('photo-1645926680403-d3a4a7d75f60'),
    alt: 'Ripe red coffee cherries among dark green leaves',
    position: '50% 50%',
    placeholder: true,
  },
  cherriesBranch: {
    src: unsplash('photo-1611330556082-0ba06d2780d0'),
    alt: 'Red and green coffee cherries ripening on the same branch',
    placeholder: true,
  },
  handPicking: {
    src: unsplash('photo-1662559102063-a665b04771fd'),
    alt: 'A hand picking ripe coffee cherries from the plant',
    position: '50% 40%',
    placeholder: true,
  },
  handful: {
    src: unsplash('photo-1670758611084-e216510c5433'),
    alt: 'A handful of freshly picked red coffee cherries',
    placeholder: true,
  },
  valley: {
    src: unsplash('photo-1633437805600-2c58bf56663c'),
    alt: 'A green farming valley surrounded by mountains',
    position: '50% 60%',
    placeholder: true,
  },
  hillside: {
    src: unsplash('photo-1647220577886-6a5faaa7c141'),
    alt: 'Coffee plants on a hillside beneath low clouds',
    placeholder: true,
  },
  terraces: {
    src: unsplash('photo-1701735513192-bc7248978c51'),
    alt: 'Rows of coffee planted along a steep forested slope',
    placeholder: true,
  },
  dryingBeds: {
    src: unsplash('photo-1649616551649-06bbf4d11354'),
    alt: 'Coffee drying on raised wooden beds under a shade structure',
    placeholder: true,
  },
  cherryPile: {
    src: unsplash('photo-1672851613221-c56f31efce8c'),
    alt: 'A mound of harvested coffee cherries in shades of red and purple',
    placeholder: true,
  },
  greenCoffee: {
    src: unsplash('photo-1561986845-fbeb7f7913d8'),
    alt: 'Unroasted green coffee beans, close up',
    placeholder: true,
  },
  greenCoffeePile: {
    src: unsplash('photo-1599766676337-49a81ed46552'),
    alt: 'A pile of green coffee beans',
    placeholder: true,
  },
  roasterCooling: {
    src: unsplash('photo-1680381615265-6cce996f6e4f'),
    alt: 'Freshly roasted coffee turning in a roaster cooling tray',
    placeholder: true,
  },
  roaster: {
    src: unsplash('photo-1511537190424-bbbab87ac5eb'),
    alt: 'A coffee roaster in a dim workspace',
    placeholder: true,
  },
  brewing: {
    src: unsplash('photo-1541469406036-71229832e06e'),
    alt: 'Coffee being brewed by hand into a glass carafe',
    position: '50% 35%',
    placeholder: true,
  },
} satisfies Record<string, Photo>;

export type ImageKey = keyof typeof images;
