import { expect } from "chai";
import {
  search,
  searchArtists,
  searchTracks,
  searchPlaylists
} from "../src/main";

describe("Spotify wrapper", () => {
  describe("smoke tests", () => {
    //search
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
});
