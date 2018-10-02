/**
 * @author kozakluke@gmail.com
 */
SpineData.owlSpine = {"skeleton": {
    "hash": "w4N/Fy8D1dFu4f4fTmaUpwXGj8I",
    "spine": "2.1.04",
    "width": 231.13,
    "height": 199.46,
    "images": "./owl2/"
}, "bones": [
    {
        "name": "body",
        "x": 1.17,
        "y": 2.66
    },
    {
        "name": "WING_L",
        "parent": "body",
        "length": 70.6,
        "x": -36.34,
        "y": 3.5,
        "rotation": 162.1
    },
    {
        "name": "WING_R",
        "parent": "body",
        "length": 69.71,
        "x": 29.87,
        "y": 0.19,
        "rotation": 19.1
    },
    {
        "name": "bone",
        "parent": "body",
        "x": 21.68,
        "y": 42.14
    },
    {
        "name": "bone2",
        "parent": "body",
        "x": -25.01,
        "y": 43.6
    },
    {
        "name": "hat",
        "parent": "body",
        "length": 81.27,
        "x": -1.81,
        "y": 82.97,
        "rotation": 140.19
    },
    {
        "name": "pompon",
        "parent": "hat",
        "length": 57.16,
        "x": 81.1,
        "y": -1.33,
        "scaleX": 0.999,
        "scaleY": 0.999,
        "rotation": 99.9
    }
], "slots": [
    {
        "name": "hat_pompon",
        "bone": "pompon",
        "attachment": "pompon"
    },
    {
        "name": "hat_back",
        "bone": "hat",
        "attachment": "hatBack"
    },
    {
        "name": "WING_R",
        "bone": "WING_R",
        "attachment": "wingRight"
    },
    {
        "name": "WING_L",
        "bone": "WING_L",
        "attachment": "wingLeft"
    },
    {
        "name": "owl",
        "bone": "body",
        "attachment": "owl"
    },
    {
        "name": "hat",
        "bone": "hat",
        "attachment": "hat1"
    },
    {
        "name": "eye",
        "bone": "bone",
        "attachment": "eye"
    },
    {
        "name": "eye2",
        "bone": "bone2",
        "attachment": "eye"
    }
], "skins": {
    "default": {
        "WING_L": {
            "wingLeft": {
                "name": "owl/wingLeft",
                "x": 29.87,
                "y": -5.83,
                "rotation": -162.1,
                "width": 87,
                "height": 81
            }
        },
        "WING_R": {
            "wingRight": {
                "name": "owl/wingRight",
                "x": 28.7,
                "y": 5.74,
                "rotation": -19.1,
                "width": 87,
                "height": 81
            }
        },
        "eye": {
            "eye": {
                "name": "owl/eye",
                "x": -1.88,
                "y": 0.46,
                "width": 35,
                "height": 34
            }
        },
        "eye2": {
            "eye": {
                "name": "owl/eye",
                "y": 1.03,
                "width": 35,
                "height": 34
            }
        },
        "hat": {
            "hat1": {
                "name": "owl/hat1",
                "x": 16.68,
                "y": -10.46,
                "rotation": -140.19,
                "width": 120,
                "height": 81
            }
        },
        "hat_back": {
            "hatBack": {
                "name": "owl/hatBack",
                "x": -3.7,
                "y": 2.61,
                "scaleX": 0.999,
                "scaleY": 0.999,
                "rotation": -140.19,
                "width": 100,
                "height": 35
            }
        },
        "hat_pompon": {
            "pompon": {
                "name": "owl/pompon",
                "x": 21.12,
                "y": 11.11,
                "rotation": 119.9,
                "width": 78,
                "height": 61
            }
        },
        "owl": {
            "owl": {
                "name": "owl/body",
                "x": -0.2,
                "y": 25.59,
                "width": 113,
                "height": 155
            }
        }
    }
}, "animations": {
    "animation": {
        "bones": {
            "WING_L": {
                "rotate": [
                    {
                        "time": 0,
                        "angle": 317.57,
                        "curve": [0.121, 0.05, 0.713, 0.01]
                    },
                    {
                        "time": 0.1666,
                        "angle": 44.7,
                        "curve": [0.121, 0.05, 0.713, 0.01]
                    },
                    {
                        "time": 0.2333,
                        "angle": 317.57,
                        "curve": [0.121, 0.05, 0.713, 0.01]
                    },
                    {
                        "time": 0.3333,
                        "angle": 44.7,
                        "curve": [0.121, 0.05, 0.713, 0.01]
                    },
                    {
                        "time": 0.4,
                        "angle": 317.57,
                        "curve": [0.121, 0.05, 0.713, 0.01]
                    },
                    {
                        "time": 0.5,
                        "angle": 44.7,
                        "curve": [0.121, 0.05, 0.713, 0.01]
                    },
                    {
                        "time": 0.5666,
                        "angle": 317.57,
                        "curve": [0.121, 0.05, 0.713, 0.01]
                    },
                    {
                        "time": 0.6666,
                        "angle": 44.7,
                        "curve": [0.121, 0.05, 0.713, 0.01]
                    },
                    {
                        "time": 0.7333,
                        "angle": -25.3,
                        "curve": [0.121, 0.05, 0.713, 0.01]
                    },
                    {
                        "time": 1.6666,
                        "angle": 317.57
                    }
                ],
                "translate": [
                    {
                        "time": 0,
                        "x": 0,
                        "y": 0,
                        "curve": "stepped"
                    },
                    {
                        "time": 0.2333,
                        "x": 0,
                        "y": 0,
                        "curve": "stepped"
                    },
                    {
                        "time": 0.4,
                        "x": 0,
                        "y": 0,
                        "curve": "stepped"
                    },
                    {
                        "time": 0.5666,
                        "x": 0,
                        "y": 0,
                        "curve": "stepped"
                    },
                    {
                        "time": 0.7333,
                        "x": 0,
                        "y": 0,
                        "curve": [0.151, 0.24, 0.535, 0.32]
                    },
                    {
                        "time": 1.1,
                        "x": -1.45,
                        "y": -1.42,
                        "curve": [0.328, 0.1, 0.746, 0.34]
                    },
                    {
                        "time": 1.6666,
                        "x": 0,
                        "y": 0
                    }
                ],
                "scale": [
                    {
                        "time": 0,
                        "x": 1,
                        "y": 1,
                        "curve": [0.626, 0.63, 1, 0.62]
                    },
                    {
                        "time": 0.7333,
                        "x": 1.5,
                        "y": 1.397,
                        "curve": [0, 0.7, 0.269, 0.58]
                    },
                    {
                        "time": 1.6666,
                        "x": 1,
                        "y": 1
                    }
                ]
            },
            "WING_R": {
                "rotate": [
                    {
                        "time": 0,
                        "angle": 39.63,
                        "curve": [0.121, 0.05, 0.713, 0.01]
                    },
                    {
                        "time": 0.1666,
                        "angle": -56.8,
                        "curve": [0.121, 0.05, 0.713, 0.01]
                    },
                    {
                        "time": 0.2333,
                        "angle": 39.63,
                        "curve": [0.121, 0.05, 0.713, 0.01]
                    },
                    {
                        "time": 0.3333,
                        "angle": -56.8,
                        "curve": [0.121, 0.05, 0.713, 0.01]
                    },
                    {
                        "time": 0.4,
                        "angle": 39.63,
                        "curve": [0.121, 0.05, 0.713, 0.01]
                    },
                    {
                        "time": 0.5,
                        "angle": -56.8,
                        "curve": [0.121, 0.05, 0.713, 0.01]
                    },
                    {
                        "time": 0.5666,
                        "angle": 39.63,
                        "curve": [0.121, 0.05, 0.713, 0.01]
                    },
                    {
                        "time": 0.6666,
                        "angle": -56.8,
                        "curve": [0.121, 0.05, 0.713, 0.01]
                    },
                    {
                        "time": 0.7333,
                        "angle": 19.77,
                        "curve": [0.121, 0.05, 0.713, 0.01]
                    },
                    {
                        "time": 1.6666,
                        "angle": 39.63
                    }
                ],
                "translate": [
                    {
                        "time": 0,
                        "x": 0,
                        "y": 0
                    },
                    {
                        "time": 1.1,
                        "x": -1.45,
                        "y": -1.42
                    },
                    {
                        "time": 1.6666,
                        "x": 0,
                        "y": 0
                    }
                ],
                "scale": [
                    {
                        "time": 0,
                        "x": 1,
                        "y": 1,
                        "curve": [0.51, 0.47, 1, 0.77]
                    },
                    {
                        "time": 0.7333,
                        "x": 1.5,
                        "y": 1.397,
                        "curve": [0, 0.7, 0.269, 0.58]
                    },
                    {
                        "time": 1.6666,
                        "x": 1,
                        "y": 1
                    }
                ]
            },
            "hat": {
                "rotate": [
                    {
                        "time": 0,
                        "angle": -4.15,
                        "curve": "stepped"
                    },
                    {
                        "time": 0.8333,
                        "angle": -4.15,
                        "curve": [0.425, 0.12, 0.763, 0.44]
                    },
                    {
                        "time": 1.2,
                        "angle": 2.88,
                        "curve": [0.25, 0, 0.75, 1]
                    },
                    {
                        "time": 1.6666,
                        "angle": -4.15
                    }
                ],
                "translate": [
                    {
                        "time": 0,
                        "x": 5.54,
                        "y": -3.31,
                        "curve": [0.405, 0.81, 0.748, 0]
                    },
                    {
                        "time": 0.8333,
                        "x": 4.47,
                        "y": 7.53,
                        "curve": [0.493, 0.69, 0.448, 0.8]
                    },
                    {
                        "time": 1.2,
                        "x": -1.4,
                        "y": 32.73,
                        "curve": [0.926, 0.18, 0.561, 0.44]
                    },
                    {
                        "time": 1.6666,
                        "x": 5.54,
                        "y": -3.31
                    }
                ],
                "scale": [
                    {
                        "time": 0,
                        "x": 1,
                        "y": 1,
                        "curve": "stepped"
                    },
                    {
                        "time": 0.8333,
                        "x": 1,
                        "y": 1,
                        "curve": "stepped"
                    },
                    {
                        "time": 1.2,
                        "x": 1,
                        "y": 1,
                        "curve": "stepped"
                    },
                    {
                        "time": 1.6666,
                        "x": 1,
                        "y": 1
                    }
                ]
            },
            "body": {
                "rotate": [
                    {
                        "time": 0,
                        "angle": 2.94,
                        "curve": [0.25, 0, 0.75, 1]
                    },
                    {
                        "time": 0.8333,
                        "angle": 354.37,
                        "curve": [0.25, 0, 0.75, 1]
                    },
                    {
                        "time": 1.6666,
                        "angle": 2.94
                    }
                ],
                "translate": [
                    {
                        "time": 0,
                        "x": 7.35,
                        "y": 0,
                        "curve": [0.738, -1.88, 0.715, 0.14]
                    },
                    {
                        "time": 0.8333,
                        "x": -4.33,
                        "y": -64.49,
                        "curve": [0.52, -0.87, 0.766, 0.2]
                    },
                    {
                        "time": 1.6666,
                        "x": 7.35,
                        "y": 0
                    }
                ],
                "scale": [
                    {
                        "time": 0,
                        "x": 1,
                        "y": 1,
                        "curve": "stepped"
                    },
                    {
                        "time": 0.6666,
                        "x": 1,
                        "y": 1,
                        "curve": [0.25, 0, 0.75, 1]
                    },
                    {
                        "time": 0.8333,
                        "x": 1,
                        "y": 1.2,
                        "curve": [0.25, 0, 0.75, 1]
                    },
                    {
                        "time": 1.6666,
                        "x": 1,
                        "y": 1
                    }
                ]
            },
            "bone": {
                "rotate": [
                    {
                        "time": 0,
                        "angle": 0,
                        "curve": [0.613, 0, 0.75, 1]
                    },
                    {
                        "time": 0.8,
                        "angle": 14.85,
                        "curve": [0.408, 0.32, 0.715, 0.71]
                    },
                    {
                        "time": 1.2666,
                        "angle": -17.19,
                        "curve": [0.333, 0.58, 0.643, 1]
                    },
                    {
                        "time": 1.6666,
                        "angle": 0
                    }
                ],
                "scale": [
                    {
                        "time": 0,
                        "x": 1,
                        "y": 1,
                        "curve": "stepped"
                    },
                    {
                        "time": 0.8,
                        "x": 1,
                        "y": 1,
                        "curve": [0.237, 1.01, 0.372, 0.97]
                    },
                    {
                        "time": 1.2666,
                        "x": 1.3,
                        "y": 1.162
                    },
                    {
                        "time": 1.6666,
                        "x": 1,
                        "y": 1
                    }
                ]
            },
            "bone2": {
                "rotate": [
                    {
                        "time": 0,
                        "angle": 0
                    },
                    {
                        "time": 0.8,
                        "angle": -27.61
                    },
                    {
                        "time": 1.2666,
                        "angle": -12.74
                    },
                    {
                        "time": 1.6666,
                        "angle": 0
                    }
                ],
                "scale": [
                    {
                        "time": 0,
                        "x": 1,
                        "y": 1,
                        "curve": "stepped"
                    },
                    {
                        "time": 0.8,
                        "x": 1,
                        "y": 1,
                        "curve": [0.237, 1.01, 0.372, 0.97]
                    },
                    {
                        "time": 1.2666,
                        "x": 1.3,
                        "y": 1.162
                    },
                    {
                        "time": 1.6666,
                        "x": 1,
                        "y": 1
                    }
                ]
            },
            "pompon": {
                "rotate": [
                    {
                        "time": 0,
                        "angle": 0,
                        "curve": "stepped"
                    },
                    {
                        "time": 0.7333,
                        "angle": 0,
                        "curve": [0.25, 0, 0.75, 1]
                    },
                    {
                        "time": 1.1333,
                        "angle": -40.29,
                        "curve": [0.25, 0, 0.75, 1]
                    },
                    {
                        "time": 1.6666,
                        "angle": 0
                    }
                ],
                "translate": [
                    {
                        "time": 0,
                        "x": 0,
                        "y": 0,
                        "curve": "stepped"
                    },
                    {
                        "time": 0.7333,
                        "x": 0,
                        "y": 0,
                        "curve": [0.943, 0.54, 0.294, 0.34]
                    },
                    {
                        "time": 1.1333,
                        "x": -7.11,
                        "y": -5.71,
                        "curve": [0.25, 0, 0.75, 1]
                    },
                    {
                        "time": 1.6666,
                        "x": 0,
                        "y": 0
                    }
                ]
            }
        },
        "drawOrder": [
            {
                "time": 0,
                "offsets": [
                    {
                        "slot": "hat_pompon",
                        "offset": 1
                    }
                ]
            },
            {
                "time": 0.5333,
                "offsets": [
                    {
                        "slot": "hat_pompon",
                        "offset": 4
                    }
                ]
            }
        ]
    }
}};

/**
 * @constructor
 */
function SpineData() { }
