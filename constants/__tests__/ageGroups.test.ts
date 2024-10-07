/**
 * Tests for the `ageGroups` constant, which is an array of objects representing different age groups.
 * Each object in the array has a `value` and a `label` property.
 * The tests ensure that the `ageGroups` constant is defined, is an array, contains valid age group objects, has unique values, and has non-empty labels.
 */
import { ageGroups } from '../ageGroups';

//just testing cody's test generation. 
describe('ageGroups', () => {
  it('should be defined', () => {
    expect(ageGroups).toBeDefined();
  });

  it('should be an array', () => {
    expect(Array.isArray(ageGroups)).toBe(true);
  });

  it('should contain age group objects', () => {
    ageGroups.forEach(group => {
      expect(group).toHaveProperty('value');
      expect(group).toHaveProperty('label');
    });
  });

  it('should have unique values for each age group', () => {
    const values = ageGroups.map(group => group.value);
    const uniqueValues = new Set(values);
    expect(values.length).toBe(uniqueValues.size);
  });

  it('should have non-empty labels for each age group', () => {
    ageGroups.forEach(group => {
      expect(group.label.trim()).not.toBe('');
    });
  });
});
