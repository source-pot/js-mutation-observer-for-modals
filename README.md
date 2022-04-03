# js-mutation-observer-for-modals
A demo of using the Javascript MutationObserver to load content automatically when showing a "modal" popup


## Credit

This idea was given to me by my friend (David)[https://github.com/DrHayes82] so I can take no credit for it.

## Example

The example presented here is very simple:
1. The developer adds as many `.modal` elements as required for the page. The modals should have a suitable class added to them to keep them hidden by default (`.modal--hidden` in this case)
2. The Javascript code presented here creates a MutationObserver and attaches it to each modal element, watching specifically for classList changes
3. To show the modal, remove the hidden class
4. The MutationObserver triggers having seen the classList change, we use this callback to find a url to load on the modal to then populate it with the response

NB: The MutationObserver will _also_ fire when the hidden class is added to the modal to hide it, so we must detect that in the callback to make sure we don't get the modal content again when hiding it (as that would be a bit pointless)