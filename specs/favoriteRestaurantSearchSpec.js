/* eslint-disable new-cap */
/* eslint-disable no-undef */
import FavoriteRestaurantSearchPresenter from '../src/scripts/views/pages/liked-restaurants/favorite-restaurants-search-presenter';
import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurants-idb';
import favoriteRestaurantSearchView from '../src/scripts/views/pages/liked-restaurants/favorite-restaurants-search-view';

describe('Search Restaurant', () => {
  let presenter;
  let favoriteRestaurants;
  let view;

  const searchRestaurants = (query) => {
    const queryElement = document.getElementById('query');
    queryElement.value = query;
    queryElement.dispatchEvent(new Event('change'));
  };

  const setRestaurantSearchContainer = () => {
    view = new favoriteRestaurantSearchView();
    document.body.innerHTML = view.getTemplate();
  };

  const constructPresenter = () => {
    favoriteRestaurants = spyOnAllFunctions(FavoriteRestaurantIdb);
    presenter = new FavoriteRestaurantSearchPresenter({
      favoriteRestaurants,
      view,
    });
  };
  beforeEach(() => {
    setRestaurantSearchContainer();
    constructPresenter();
  });

  describe('when query is not empty', () => {
    it('should be able to capture the query typed by the user', () => {
      searchRestaurants('film a');

      expect(presenter.latestQuery)
        .toEqual('film a');
    });

    it('should ask the model to search for liked movies', () => {
      searchRestaurants('film a');

      expect(favoriteRestaurants.searchRestaurants)

        .toHaveBeenCalledWith('film a');
    });

    it('should show-when the restaurant returned does not contain a title', (done) => {
      document.getElementById('restaurants').addEventListener('restaurants:updated', () => {
        const restaurantTitles = document.querySelectorAll('.nameRestaurant');
        expect(restaurantTitles.item(0).textContent).toEqual('-');

        done();
      });

      favoriteRestaurants.searchRestaurants.withArgs('restaurant a').and.returnValues([
        { id: 444 },
      ]);

      searchRestaurants('restaurant a');
    });

    it('should show the restaurants found by favorite Restaurants', (done) => {
      document.getElementById('restaurants')
        .addEventListener('restaurants:updated', () => {
          expect(document.querySelectorAll('.restaurantInfo').length).toEqual(3);
          done();
        });

      favoriteRestaurants.searchRestaurants.withArgs('restaurant a').and.returnValues([
        { id: 111, title: 'restaurant abc' },
        { id: 222, title: 'ada juga restaurant abcde' },
        { id: 333, title: 'ini juga boleh restaurant a' },
      ]);

      searchRestaurants('restaurant a');
    });

    it('should show the name of the restaurants found by favorite restaurants', (done) => {
      document.getElementById('restaurants')
        .addEventListener('restaurants:updated', () => {
          const restaurantTitles = document.querySelectorAll('.nameRestaurant');
          expect(restaurantTitles.item(0).textContent).toEqual('restaurant abc');
          expect(restaurantTitles.item(1).textContent).toEqual('ada juga restaurant abcde');
          expect(restaurantTitles.item(2).textContent).toEqual('ini juga boleh restaurant a');

          done();
        });

      favoriteRestaurants.searchRestaurants.withArgs('restaurant a').and.returnValues([
        { id: 111, name: 'restaurant abc' },
        { id: 222, name: 'ada juga restaurant abcde' },
        { id: 333, name: 'ini juga boleh restaurant a' },
      ]);

      searchRestaurants('restaurant a');
    });
  });

  describe('when query is empty', () => {
    it('should capture the query as empty', () => {
      searchRestaurants(' ');

      expect(presenter.latestQuery.length).toEqual(0);

      searchRestaurants('  ');

      expect(presenter.latestQuery.length).toEqual(0);

      searchRestaurants('');

      expect(presenter.latestQuery.length).toEqual(0);

      searchRestaurants('\t');

      expect(presenter.latestQuery.length).toEqual(0);
    });

    it('should show all favorite restaurants', () => {
      searchRestaurants('   ');

      expect(favoriteRestaurants.getAllRestaurants)
        .toHaveBeenCalled();
    });
  });

  describe('when no favorite restaurants could be found', () => {
    it('should show the empty message', (done) => {
      document.getElementById('restaurants')
        .addEventListener('restaurants:updated', () => {
          expect(document.querySelectorAll('.restaurant-item_not_found').length).toEqual(1);
          done();
        });

      favoriteRestaurants.searchRestaurants.withArgs('restaurant a').and.returnValues([]);

      searchRestaurants('restaurant a');
    });

    it('should not show any restaurant', (done) => {
      document.getElementById('restaurants').addEventListener('restaurants:updated', () => {
        expect(document.querySelectorAll('.restaurantInfo').length).toEqual(0);
        done();
      });

      favoriteRestaurants.searchRestaurants.withArgs('restaurant a').and.returnValues([]);

      searchRestaurants('restaurant a');
    });
  });
});
