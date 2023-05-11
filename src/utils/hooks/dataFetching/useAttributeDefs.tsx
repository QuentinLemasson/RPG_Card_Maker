import { useEffect, useCallback } from 'react';
import { useAppDispatch } from '../../../store';
import { loadAttributes, resetAttributeSlice } from '../../../reducers/attributeSlice';

/**
 * @description fetch and provide utility functions for attributeDefs, stored in attributeSlice
 * @returns [fetchAttributeDefs] <Array>
 */
export const useAttributeDefs = () => {

    const appDispatch = useAppDispatch();

    // use attributeSlice LOAD thunk to fetch attribute defs
    const fetchAttributeDefs = useCallback( () => {
        appDispatch(loadAttributes());
    }, [appDispatch]);

    // automatically LOAD attributes on mount, and cler the slice on dismount
    useEffect(() => {
        fetchAttributeDefs();

        return () => {
            appDispatch(resetAttributeSlice());
        }
    }, [appDispatch, fetchAttributeDefs])

    return [fetchAttributeDefs];
}