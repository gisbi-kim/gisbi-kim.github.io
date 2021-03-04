function [H] = housemat(u)

[m, ~] = size(u);

% H = eye(m, m) - 2*((u*u')/(u'*u));
H = eye(m, m) - 2*((u*u')); % if u is normalized.

end

