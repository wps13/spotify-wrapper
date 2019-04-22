/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import chai, { expect } from "chai";

import sinon from "sinon";
import sinonChai from "sinon-chai";
import sinonStubPromise from "sinon-stub-promise";

import {
  search,
  searchArtists,
  searchTracks,
  searchPlaylists
} from "../src/main";

chai.use(sinonChai);
sinonStubPromise(sinon);

global.fetch = require("node-fetch");

describe("Spotify wrapper", () => {
  describe("smoke tests", () => {
    // search
    // searchArtists
    // searchTracks
    // searchPlaylists

    it("should exist the search method", () => {
      expect(search).to.exist;
    });

    it("should exist the searchArtists method", () => {
      expect(searchArtists).to.exist;
    });

    it("should exist the searchTracks method", () => {
      expect(searchTracks).to.exist;
    });

    it("should exist the searchPlaylists method", () => {
      expect(searchPlaylists).to.exist;
    });
  });

  describe("Generic search", () => {
    let fetchedStub;
    beforeEach(() => {
      fetchedStub = sinon.stub(global, "fetch");
    });

    afterEach(() => {
      fetchedStub.restore();
    });

    it("should call fetch function", () => {
      const artists = search();
      expect(fetchedStub).to.have.been.calledOnce;
      fetchedStub.restore();
    });

    it("should receive correct url to fetch", () => {
      context("passing one type", () => {
        const artists = search("Blackpink", "artist");
        expect(fetchedStub).to.have.been.calledWith(
          "https://api.spotify.com/v1/search?q=Blackpink&type=artist"
        );

        const artists2 = search("Jennie", "artist");
        expect(fetchedStub).to.have.been.calledWith(
          "https://api.spotify.com/v1/search?q=Jennie&type=artist"
        );

        const albums = search("kill%20this%20love", "album");
        expect(fetchedStub).to.have.been.calledWith(
          "https://api.spotify.com/v1/search?q=kill%20this%20love&type=album"
        );
        const albums2 = search("solo", "album");
        expect(fetchedStub).to.have.been.calledWith(
          "https://api.spotify.com/v1/search?q=solo&type=album"
        );
      });

      context("passing more than one type", () => {
        const artistsAndAlbums = search("Blackpink", ["artist", "album"]);
        expect(fetchedStub).to.have.been.calledWith(
          "https://api.spotify.com/v1/search?q=Blackpink&type=artist,album"
        );
      });
    });
  });
});
