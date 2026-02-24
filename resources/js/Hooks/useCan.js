import { usePage } from '@inertiajs/react';

/**
 * useCan — React hook for Spatie permission checks.
 * 
 * Equivalent of Laravel's @can / $user->can() in React/Inertia.
 * Reads from the globally shared auth.user.permissions prop.
 *
 * Usage:
 *   const { can, hasRole, hasAnyRole } = useCan();
 *   can('edit users')     // true/false
 *   hasRole('admin')      // true/false
 *   hasAnyRole(['admin', 'superadmin'])  // true/false
 */
export function useCan() {
    const { auth } = usePage().props;
    const user = auth?.user;

    const permissions = (user?.permissions ?? []).map(p => p.name);
    const roles = (user?.roles ?? []).map(r => r.name);

    /**
     * Check if the user has a specific permission (direct or via role).
     * Mirrors: $user->can('permission-name')  or  @can('permission-name')
     */
    function can(permission) {
        if (!user) return false;
        return permissions.includes(permission);
    }

    /**
     * Check if user has a specific role.
     * Mirrors: $user->hasRole('admin')
     */
    function hasRole(role) {
        if (!user) return false;
        return roles.includes(role);
    }

    /**
     * Check if user has any of the given roles.
     * Mirrors: $user->hasAnyRole(['admin', 'superadmin'])
     */
    function hasAnyRole(roleList = []) {
        if (!user) return false;
        return roleList.some(r => roles.includes(r));
    }

    /**
     * Check if user has all of the given roles.
     * Mirrors: $user->hasAllRoles(['admin', 'editor'])
     */
    function hasAllRoles(roleList = []) {
        if (!user) return false;
        return roleList.every(r => roles.includes(r));
    }

    return {
        can,
        cannot: (permission) => !can(permission),
        hasRole,
        hasAnyRole,
        hasAllRoles,
        roles,
        permissions,
        user,
    };
}
