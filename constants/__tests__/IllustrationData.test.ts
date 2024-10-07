import { illustrationData, IllustrationStyle } from '../IllustrationData';
import * as m from "@/paraglide/messages";

describe('illustrationData', () => {
  it('should be defined', () => {
    expect(illustrationData).toBeDefined();
  });

  it('should be an array', () => {
    expect(Array.isArray(illustrationData)).toBe(true);
  });

  it('should contain IllustrationStyle objects', () => {
    illustrationData.forEach(item => {
      expect(item).toHaveProperty('value');
      expect(item).toHaveProperty('title');
      expect(item).toHaveProperty('description');
      expect(item).toHaveProperty('image');
    });
  });

  it('should have unique values for each illustration style', () => {
    const values = illustrationData.map(item => item.value);
    const uniqueValues = new Set(values);
    expect(values.length).toBe(uniqueValues.size);
  });

  it('should have valid image URLs', () => {
    illustrationData.forEach(item => {
      expect(item.image).toMatch(/^\/placeholder\.svg\?height=200&width=300$/);
    });
  });

  it('should use paraglide messages for titles and descriptions', () => {
    expect(illustrationData[0].title).toBe(m.illustrationData_disneyStyle_title());
    expect(illustrationData[0].description).toBe(m.illustrationData_disneyStyle_description());
    expect(illustrationData[1].title).toBe(m.illustrationData_aquarelle_title());
    expect(illustrationData[1].description).toBe(m.illustrationData_aquarelle_description());
  });

  it('should contain all expected illustration styles', () => {
    const expectedStyles = [
      "Disney Style",
      "Aquarelle",
      "Storybook Illustration",
      "Pixar Style",
      "Manga",
      "Flat Design"
    ];
    const actualStyles = illustrationData.map(item => item.value);
    expect(actualStyles).toEqual(expect.arrayContaining(expectedStyles));
    expect(actualStyles.length).toBe(expectedStyles.length);
  });
});
